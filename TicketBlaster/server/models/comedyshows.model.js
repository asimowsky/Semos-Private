const mongoose = require("mongoose");

const comedyShowsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  eventId: { type: Number, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
  location: { type: String, required: true },
  image: { type: String, required: true },
});

const comedyShows = mongoose.model("comedyShows", comedyShowsSchema);

module.exports = comedyShows;
