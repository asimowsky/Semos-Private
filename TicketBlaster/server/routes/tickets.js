const express = require("express");
const {
  getTickets,
  removeCartItem,
  createCartItem,
  purchaseTicketsByUserId,
} = require("../services/ticketService");

const router = express.Router();

router.get("/:userid/:status", getTickets);
router.delete("/delete/:id", removeCartItem);
router.post("/cart-item", createCartItem);

router.post("/purchase-ticket/:id", purchaseTicketsByUserId);

module.exports = router;
