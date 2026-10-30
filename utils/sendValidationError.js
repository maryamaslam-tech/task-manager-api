// utils/sendValidationError
const sendValidationError = (res, error, statusCode = 400) => {
  return res.status(statusCode).json({
    error,
  });
};
module.exports = sendValidationError;