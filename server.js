const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
console.log("JWT_SECRET exists:", !!process.env.JWT_SECRET);
console.log("MONGO_URI exists:", !!process.env.MONGO_URI);


const app = express();

app.use(express.json());

app.use(cors({ origin: ["http://localhost:3000", "https://hotel-booking-frontend-six-flax.vercel.app"], credentials: true }));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/bookings", require("./routes/bookings"));

app.get("/", (req, res) => res.send("API is working"));

app.listen(process.env.PORT, () => console.log(`Server on port ${process.env.PORT}`));
