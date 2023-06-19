const express = require("express");
const router = express.Router();

const ComedyShows = require("../models/comedyshows.model");

router.get("/events", async (req, res) => {
  try {
    const events = await ComedyShows.find({ isDeleted: false });
    res.json(events);
  } catch (err) {
    res.json({ status: "error", error: err.message });
  }
});

router.post("/events", async (req, res) => {
  try {
    const lastEvent = await ComedyShows.findOne().sort({ eventId: -1 });
    const newEventId = lastEvent ? lastEvent.eventId + 1 : 1;

    const newEvent = await ComedyShows.create({
      title: req.body.title,
      eventId: newEventId,
      date: req.body.date,
      description: req.body.description,
      location: req.body.location,
      image: req.body.image,
    });

    res.json({
      status: "Comedy Show Created Successfully!",
      event: newEvent,
    });
  } catch (err) {
    res.json({ status: "error", error: err.message });
  }
});

router.post("/events/:id/delete", async (req, res) => {
  try {
    const event = await ComedyShows.findById(req.params.id);
    if (!event) {
      return res.json({ status: "error", error: "Comedy Show not found" });
    }

    event.isDeleted = true;
    await event.save();

    res.json({ status: "Comedy Show Deleted Successfully!" });
  } catch (err) {
    res.json({ status: "error", error: err.message });
  }
});

module.exports = router;
