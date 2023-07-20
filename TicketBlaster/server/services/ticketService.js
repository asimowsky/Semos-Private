const Ticket = require("../models/ticket.model");

const createCartItem = async (req, res) => {
  try {
    const { itemId, quantity } = req.body;
    const { user, event } = req.body;

    // Check for an existing cart item with the same user and event
    let cartItem = await Ticket.findOne({ user, event });

    if (cartItem) {
      // If the cart item already exists, update its quantity
      cartItem.quantity += +quantity;
    } else {
      // If the cart item doesn't exist, create a new one
      cartItem = new Ticket({ ...req.body });
    }

    await cartItem.save();
    res.status(200).send(cartItem);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const purchaseTicketsByUserId = async (req, res) => {
  try {
    // const newQRCode = new QrCode({
    //   hashCode: "Test UUID",
    //   isUsed: false,
    // });
    // await newQRCode.save();
    const ticket = await Ticket.findOneAndUpdate(
      { userID: req.params.userId, isPurchased: false },
      {
        isPurchased: true,
        // qrCode: newQRCode._id,
      },
      { new: true }
    );

    if (!ticket) {
      return res.status(404).send("Ticket not found");
    }

    res.status(200).send(ticket);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const getTickets = async (req, res) => {
  const { userid, status } = req.params;
  try {
    const query = {
      user: userid,
      isPurchased: status,
    };
    const tickets = await Ticket.find(query)
      .populate("event")
      .populate("qrCode");
    // .sort({ date: 1 }); // Sort by date in ascending order

    res.status(200).send(tickets);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const removeCartItem = async (req, res) => {
  try {
    await Ticket.deleteOne({ _id: req.params.id });
    res.status(200).send("Item deleted from cart");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getTickets,
  removeCartItem,
  createCartItem,
  purchaseTicketsByUserId,
};
