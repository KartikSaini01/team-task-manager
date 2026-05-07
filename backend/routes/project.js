const router = require("express").Router();
const Project = require("../models/Project");
const auth = require("../middleware/auth");

// Create project (Admin only)
router.post("/", auth, async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).send("Only admin");

  const project = await Project.create({
    title: req.body.title,
    createdBy: req.user.id
  });

  res.json(project);
});

// Get projects
router.get("/", auth, async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

module.exports = router;