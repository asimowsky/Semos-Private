const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  relatedEvents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RelatedEvent",
    },
  ],
});

const events = mongoose.model("events", eventSchema);

module.exports = events;
