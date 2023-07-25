const User = require("../models/user.model.js");
const path = require("path");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ isDeleted: false });
    res.status(200).send(users);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const updateUser = async (req, res) => {
  try {
    if (req.body.image) {
      const imageBase64 = req.body.image;

      // Extract file extension from base64 string
      const matches = imageBase64.match(/^data:image\/([a-zA-Z]+)/);
      const fileExtension = matches ? matches[1] : "png";

      const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");
      const imageData = Buffer.from(base64Data, "base64");

      const uploadDir = path.join(__dirname, "../uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
      }

      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const fileName = "image-" + uniqueSuffix + "." + fileExtension;
      const filePath = path.join(uploadDir, fileName);

      fs.writeFile(filePath, imageData, (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "Error uploading image." });
        }
      });

      // Set the image path as a URL
      req.body.image = `http://localhost:8085/uploads/${fileName}`;
    }

    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      req.body.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

async function softDeleteUser(userId) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    user.isDeleted = true;
    await user.save();
    return user;
  } catch (error) {
    throw new Error("Failed to delete user");
  }
}

const changeUserRole = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    user.isAdmin = req.body.isAdmin;
    await user.save();
    res.status(200).send("User role changed");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  softDeleteUser,
  changeUserRole,
};
