// middleware/errorHandler.js

const errorHandler = (err, req, res, next) => {
  console.error(err);
  //   if (err.code === "23505") {
  //     return res.status(409).json({
  //       error: "Email already Exists.",
  //     });
  //   }
  res.status(500).json({
    error: "Internal server Error.",
  });
};
module.exports = errorHandler;
