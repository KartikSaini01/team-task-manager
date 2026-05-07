const express = require("express");

const router = express.Router();

const Task = require("../models/Task");

const authMiddleware = require("../middleware/auth");


// CREATE TASK
router.post("/", authMiddleware, async (req, res) => {

  try {

    const { title, assignedTo, dueDate } = req.body;

    const task = await Task.create({
      title,
      assignedTo,
      dueDate
    });

    res.json(task);

  } catch (error) {

    res.status(500).json({
      message: "Error creating task"
    });

  }

});


// GET ALL TASKS
router.get("/", authMiddleware, async (req, res) => {

  try {

    const tasks = await Task.find();

    res.json(tasks);

  } catch (error) {

    res.status(500).json({
      message: "Error fetching tasks"
    });

  }

});


// UPDATE TASK STATUS
router.put("/:id", authMiddleware, async (req, res) => {

  try {

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(task);

  } catch (error) {

    res.status(500).json({
      message: "Error updating task"
    });

  }

});


module.exports = router;