const Event = require("../models/event.model");
const RelatedEvent = require("../models/related.model");
const path = require("path");
const fs = require("fs");

const createEvent = async (req, res, next) => {
  const imageBase64 = req.body.image;

  if (!imageBase64) {
    return res.status(400).json({ message: "No base64 data found." });
  }

  // Extract file extension from base64 string
  const matches = imageBase64.match(/^data:image\/([a-zA-Z]+)/);
  const fileExtension = matches ? matches[1] : "png";

  const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");

  const imageData = Buffer.from(base64Data, "base64");

  const uploadDir = path.join(__dirname, "../uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  const fileName = "image-" + uniqueSuffix + "." + fileExtension;
  const filePath = path.join(uploadDir, fileName);

  fs.writeFile(filePath, imageData, (err) => {
    if (err) {
      return res.status(500).json({ message: "Error uploading file." });
    }
  });
  const { title, description, date, category, location, price, relatedEvents } =
    req.body;

  const image = fileName;
  const newEvent = new Event({
    title,
    description,
    date,
    category,
    location,
    image,
    price,
    relatedEvents: [],
  });

  const savedEvent = await newEvent.save();

  for (const relatedEventId of relatedEvents) {
    const relatedEvent = await RelatedEvent.findById(relatedEventId);
    if (relatedEvent) {
      relatedEvent.events.push(savedEvent._id);
      await relatedEvent.save();
    }
  }

  savedEvent.relatedEvents = relatedEvents;
  await savedEvent.save();
  res.status(201).json(savedEvent);
};

const updateEvent = async (req, res, next) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedEvent);
  } catch (err) {
    next(err);
  }
};

const deleteEvent = async (req, res, next) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.status(200).json("Event has been deleted");
  } catch (err) {
    next(err);
  }
};

const getEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    const relatedEvents = await Event.find({
      _id: { $in: event.relatedEvents },
    });

    const eventWithRelated = {
      ...event.toObject(),
      relatedEvents: relatedEvents,
    };

    res.status(200).json(eventWithRelated);
  } catch (err) {
    next(err);
  }
};

const getSearchResults = async (req, res, next) => {
  try {
    const { search } = req.query;
    const searchRegex = new RegExp(search, "i");

    const searchResults = await Event.find({
      $or: [{ title: searchRegex }, { description: searchRegex }],
    });

    res.status(200).json(searchResults);
  } catch (err) {
    next(err);
  }
};

const getSoonestEvent = async (req, res, next) => {
  try {
    const { limit } = req.query;
    const currentDate = new Date();

    const soonestEvent = await Event.find({
      date: { $gte: currentDate },
    })
      .sort({ date: 1 })
      .limit(limit);

    res.status(200).json(soonestEvent);
  } catch (err) {
    next(err);
  }
};

const getAllEvents = async (req, res, next) => {
  try {
    const { type } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    let upcomingEvents;

    if (type || limit) {
      upcomingEvents = await Event.find({
        category: type,
      })
        .skip((page - 1) * limit)
        .limit(limit);
    } else {
      upcomingEvents = await Event.find({});
    }

    if (upcomingEvents.length === 0) {
      return res.status(404).json({ message: "No upcoming events found." });
    }

    res.status(200).json(upcomingEvents);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createEvent,
  updateEvent,
  deleteEvent,
  getEvent,
  getAllEvents,
  getSearchResults,
  getSoonestEvent,
};
