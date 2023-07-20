const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
mongoose.connect(process.env.MONGODB_URL);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/events");
const ticketRoutes = require("./routes/tickets");
const userRoutes = require("./routes/users");

app.use("/api/auth", authRoutes);

app.use("/api/events", eventRoutes);

app.use("/api/users", userRoutes);

app.use("/api/tickets", ticketRoutes);

const port = process.env.PORT || 8085;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
