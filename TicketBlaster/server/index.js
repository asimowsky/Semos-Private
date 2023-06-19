const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL);

const authRoutes = require("./routes/auth");
const musicalRoutes = require("./routes/musicalevents");
const comedyRoutes = require("./routes/comedyshows");

app.use("/api/auth", authRoutes);
app.use("/api/musical", musicalRoutes);
app.use("/api/comedy", comedyRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
