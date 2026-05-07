const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Root route (important for Railway)
app.get("/", (req, res) => {
  res.send("API is running");
});

// DB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ DB Error:", err));

// Routes
app.use("/auth", require("./routes/auth"));
app.use("/projects", require("./routes/project"));
app.use("/tasks", require("./routes/task"));

// PORT FIX FOR RAILWAY
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on " + PORT));