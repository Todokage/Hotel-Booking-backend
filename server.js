const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(cors({ origin: ["http://localhost:3000", "https://your-frontend-url.vercel.app"], credentials: true }));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/bookings", require("./routes/bookings"));

app.get("/", (req, res) => res.send("API is working"));

app.listen(process.env.PORT, () => console.log(`Server on port ${process.env.PORT}`));
