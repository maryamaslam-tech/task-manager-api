// middleware/validateTask.js
const sendValidationError = require("../utils/sendValidationError.js");

const validateTask = (mode) => {
  return (req, res, next) => {
    const task = req.body;
    if (!task || typeof task !== "object" || Array.isArray(req.body)) {
      return sendValidationError(res, "Request body must be an object.");
    }

    const allowedFields = ["title", "description", "status", "dueDate"];
    const providedFields = Object.keys(task);

    const invalidFields = providedFields.filter(
      (field) => !allowedFields.includes(field),
    );

    if (providedFields.length === 0) {
      return sendValidationError(res, "Please provide at least one field.");
    }

    if (invalidFields.length > 0) {
      return sendValidationError(
        res,
        `Invalid field(s): ${invalidFields.join(", ")}`,
      );
    }

    if (mode === "create") {
      if (task.title === undefined || task.status === undefined) {
        return sendValidationError(res, "Title and Status are required fields");
      }
    }

    if (mode === "put") {
      if (allowedFields.some((field) => task[field] === undefined)) {
        return sendValidationError(res, "All fields are required.");
      }

      if (task.title === null || task.status === null) {
        return sendValidationError(res, "Title and Status can't be null.");
      }
    }

    if (task.title !== undefined) {
      if (typeof task.title !== "string" || !task.title.trim()) {
        return sendValidationError(res, "Title must be a non-empty string");
      }

      task.title = task.title.trim();
    }

    if (task.description !== undefined) {
      if (task.description !== null && typeof task.description !== "string") {
        return sendValidationError(res, "Description must be a string or null");
      }
      if (typeof task.description === "string") {
        task.description = task.description.trim();
      }
    }

    if (task.status !== undefined) {
      const allowedStatuses = ["pending", "in_progress", "completed"];

      if (
        typeof task.status !== "string" ||
        !allowedStatuses.includes(task.status.trim())
      ) {
        return sendValidationError(
          res,
          "Status must be pending, in_progress, or completed",
        );
      }

      task.status = task.status.trim();
    }

    if (task.dueDate !== undefined) {
      if (task.dueDate !== null) {
        if (
          typeof task.dueDate !== "string" ||
          !/^\d{4}-\d{2}-\d{2}$/.test(task.dueDate)
        ) {
          return sendValidationError(
            res,
            "Due date must use YYYY-MM-DD format or null",
          );
        }

        const date = new Date(`${task.dueDate}T00:00:00.000Z`);

        if (
          Number.isNaN(date.getTime()) ||
          date.toISOString().slice(0, 10) !== task.dueDate
        ) {
          return sendValidationError(
            res,
            "Please provide a valid calendar date",
          );
        }
      }
    }
    next();
  };
};
module.exports = validateTask;
