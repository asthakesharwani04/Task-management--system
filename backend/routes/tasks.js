const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const auth = require("../middleware/authMiddleware");

router.use(auth);

// Create task
router.post("/", taskController.createTask);

// Get tasks
router.get("/", taskController.getTasks);

// UPDATE task — SUPER SIMPLE
router.put("/:id", taskController.updateTask);

// Delete task
router.delete("/:id", taskController.deleteTask);

module.exports = router;
