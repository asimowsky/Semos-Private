const express = require("express");
const {
  createEvent,
  updateEvent,
  deleteEvent,
  getEvent,
  getAllEvents,
  getSearchResults,
  getSoonestEvent,
} = require("../services/eventService");

const router = express.Router();

router.post("/", createEvent);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

router.get("/find/:id", getEvent);
router.get("/", getSearchResults);
router.get("/type", getAllEvents);
router.get("/soonest", getSoonestEvent);

module.exports = router;
