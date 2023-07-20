const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "events",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  isPurchased: {
    type: Boolean,
    default: false,
  },
  qrCode: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "QrCode",
  },
});

module.exports = mongoose.model("tickets", ticketSchema);
