// controller/tasksController.js
const {
  // testConnection
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require("../models/tasksModel.js");

const sendValidationError = require("../utils/sendValidationError.js");

// const getTestConnection = async (req, res) => {
//   try {
//     const result = await testConnection();
//     res.json(result);
//   } catch (error) {
//     console.error(error);

//     res.status(500).json({
//       error: "Internal server error.",
//     });
//   }
// };

const getAllTasksController = async (req, res, next) => {
  try {
    const { status, dueDate, sort, order } = req.query;
    const tasks = await getAllTasks(status, dueDate, sort, order);
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

const getTaskByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!/^[1-9]\d*$/.test(id)) {
      return sendValidationError(res, "Task ID must be a positive integer");
    }

    const task = await getTaskById(id);
    if (!task) {
      return sendValidationError(res, "Task not found", 404);
    }
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

const createTaskController = async (req, res, next) => {
  try {
    const { title, description, status, dueDate } = req.body;

    const newTask = await createTask({
      title,
      description: description ?? null,
      status,
      dueDate: dueDate ?? null,
    });

    return res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};

const updateTaskController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = req.body;

    if (!/^[1-9]\d*$/.test(id)) {
      return sendValidationError(res, "Task ID must be a positive integer");
    }

    const updatedTask = await updateTask(Number(id), task);

    if (!updatedTask) {
      return sendValidationError(res, "Task not found", 404);
    }

    return res.status(200).json(updatedTask);
  } catch (error) {
    next(error);
  }
};

const deleteTaskController = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!/^[1-9]\d*$/.test(id)) {
      return sendValidationError(res, "Task ID must be a positive integer");
    }

    const deletedTask = await deleteTask(Number(id));

    if (!deletedTask) {
      return sendValidationError(res, "Task not Found.", 404);
    }
    return res.status(200).json(deletedTask);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  // getTestConnection,
  getAllTasksController,
  getTaskByIdController,
  createTaskController,
  updateTaskController,
  deleteTaskController,
};
