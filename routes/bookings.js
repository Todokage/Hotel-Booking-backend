const express = require("express");
const Booking = require("../models/Booking");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const booking = new Booking({ ...req.body, userId: req.user.userId });
  await booking.save();
  res.status(201).json({ message: "Booking successful" });
});

router.get("/", auth, async (req, res) => {
  const filter = req.user.isAdmin ? {} : { userId: req.user.userId };
  const bookings = await Booking.find(filter);
  res.json(bookings);
});

router.delete("/:id", auth, async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).json({ error: "Forbidden" });
  await Booking.findByIdAndDelete(req.params.id);
  res.json({ message: "Booking deleted" });
});

module.exports = router;
