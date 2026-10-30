// router/tasksRoute.js

const express = require("express");
const router = express.Router();

const validateTaskFilter = require("../middleware/validateTaskFilter.js");

const validateTaskSort = require("../middleware/validateTaskSort.js");

const validateTask = require("../middleware/validateTask");

const {
  getAllTasksController,
  getTaskByIdController,
  createTaskController,
  updateTaskController,
  deleteTaskController,
} = require("../controllers/tasksController");

router.get("/", validateTaskFilter, validateTaskSort, getAllTasksController);

router.get("/:id", getTaskByIdController);

router.post("/", validateTask("create"), createTaskController);

router.put("/:id", validateTask("put"), updateTaskController);

router.patch("/:id", validateTask("update"), updateTaskController);

router.delete("/:id", deleteTaskController);

module.exports = router;
