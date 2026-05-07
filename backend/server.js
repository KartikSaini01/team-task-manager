const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();


// MIDDLEWARE
app.use(cors());

app.use(express.static("public"));

app.use(express.json());


// DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URI)

.then(() => console.log("MongoDB Connected"))

.catch(err => console.log("DB Error:", err));


// ROUTES
app.use("/auth", require("./routes/auth"));

app.use("/tasks", require("./routes/task"));


// HOME ROUTE
app.get("/", (req, res) => {

  res.send("Team Task Manager API Running");

});


// PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(`Server running on ${PORT}`);

});