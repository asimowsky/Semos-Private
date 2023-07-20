const express = require("express");
const {
  getAllUsers,
  getUser,
  updateUser,
  softDeleteUser,
  //   getPurchasedEvents,
  changeUserRole,
} = require("../services/userService");
const router = express.Router();

router.get("/", getAllUsers);

router.get("/:id", getUser);
// router.get("/tickets/:id", getPurchasedEvents);
router.put("/:id", updateUser);
router.patch("/soft-delete/:id", softDeleteUser);
router.patch("/role/:id", changeUserRole);

module.exports = router;
