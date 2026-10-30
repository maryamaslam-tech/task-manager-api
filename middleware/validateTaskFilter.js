// middleware/validateTaskFilter.js;

const sendValidationError = require("../utils/sendValidationError.js");

const validateTaskFilter = (req, res, next) => {
  const allowedStatuses = ["pending", "in_progress", "completed"];
  const { status, dueDate } = req.query;

  if (status !== undefined && !allowedStatuses.includes(status)) {
    return sendValidationError(
      res,
      "Status must be pending, in_progress, or completed",
    );
  }

  if (dueDate !== undefined) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dueDate)) {
      return sendValidationError(res, "Due date must use YYYY-MM-DD format");
    }

    const date = new Date(`${dueDate}T00:00:00.000Z`);

    if (
      Number.isNaN(date.getTime()) ||
      date.toISOString().slice(0, 10) !== dueDate
    ) {
      return sendValidationError(res, "Please provide a valid calendar date");
    }
  }

  next();
};

module.exports = validateTaskFilter;
