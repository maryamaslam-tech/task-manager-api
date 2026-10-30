//server.js
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.json());

const tasksRouter = require("./routes/tasksRoute.js");
app.use("/tasks", tasksRouter);

const errorHandler = require("./middleware/errorHandler.js");
app.use(errorHandler);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
