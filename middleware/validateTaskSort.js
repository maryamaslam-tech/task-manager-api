// middleware/validateTaskSort.js
const sendValidationError = require("../utils/sendValidationError.js");

const validateTaskSort = (req, res, next) => {
  const allowedSortFields = ["created_at", "dueDate", "title"];
  const allowedOrders = ["asc", "desc"];

  const { sort, order } = req.query;
  if (sort !== undefined && !allowedSortFields.includes(sort)) {
    return sendValidationError(
      res,
      "sort must be created_at,  dueDate and  title",
    );
  }

  if (order !== undefined && !allowedOrders.includes(order)) {
    return sendValidationError(res, "order must be asc and desc.");
  }
  next();
};
module.exports = validateTaskSort;
