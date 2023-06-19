const express = require("express");
const router = express.Router();

const MusicalEvent = require("../models/muiscalevent.model");

router.get("/events", async (req, res) => {
  try {
    const events = await MusicalEvent.find({ isDeleted: false });
    res.json(events);
  } catch (err) {
    res.json({ status: "error", error: err.message });
  }
});

router.post("/events", async (req, res) => {
  try {
    const lastEvent = await MusicalEvent.findOne().sort({ eventId: -1 });
    const newEventId = lastEvent ? lastEvent.eventId + 1 : 1;

    const newEvent = await MusicalEvent.create({
      title: req.body.title,
      eventId: newEventId,
      date: req.body.date,
      description: req.body.description,
      location: req.body.location,
      image: req.body.image,
    });

    res.json({
      status: "Musical Event Created Successfully!",
      event: newEvent,
    });
  } catch (err) {
    res.json({ status: "error", error: err.message });
  }
});

router.post("/events/:id/delete", async (req, res) => {
  try {
    const event = await MusicalEvent.findById(req.params.id);
    if (!event) {
      return res.json({ status: "error", error: "Musical Event not found" });
    }

    event.isDeleted = true;
    await event.save();

    res.json({ status: "Musical Event Deleted Successfully!" });
  } catch (err) {
    res.json({ status: "error", error: err.message });
  }
});

module.exports = router;
