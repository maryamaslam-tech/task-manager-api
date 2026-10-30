// model/tasksModel.js

const pool = require("../db");

// const testConnection = async () =>{
//     const result = await pool.query("SELECT NOW()");
//     return result.rows[0];
// }

const getAllTasks = async (status, dueDate, sort, order) => {
  const conditions = [];
  const values = [];

  // Filter tasks by status
  if (status !== undefined) {
    values.push(status);
    conditions.push(`status = $${values.length}`);
  }

  // Filter tasks by dueDate
  if (dueDate !== undefined) {
    values.push(dueDate);
    conditions.push(`"dueDate" = $${values.length}`);
  }

  const whereClause = conditions.length
    ? `WHERE ${conditions.join(" AND ")}`
    : "";

  // Sorting
  const allowedSortFields = ["created_at", "dueDate", "title"];
  const allowedOrders = ["asc", "desc"];

  let orderByClause = "";

  if (sort && allowedSortFields.includes(sort)) {
    const sortOrder =
      order && allowedOrders.includes(order) ? order.toUpperCase() : "ASC";

    const sortColumn = sort === "dueDate" ? '"dueDate"' : sort;

    orderByClause = `ORDER BY ${sortColumn} ${sortOrder}`;
  }

  const query = `
    SELECT * FROM tasks
    ${whereClause}
    ${orderByClause}
  `;

  const result = await pool.query(query, values);
  return result.rows;
};

// Get one task by ID
const getTaskById = async (id) => {
  const query = `
    SELECT *
    FROM tasks
    WHERE task_id = $1
  `;

  const result = await pool.query(query, [id]);
  return result.rows[0];
};

// Create a new task
const createTask = async (task) => {
  const { title, description, status, dueDate } = task;

  const query = `
    INSERT INTO tasks (title, description, status, "dueDate")
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;

  const values = [title, description, status, dueDate];

  const result = await pool.query(query, values);
  return result.rows[0];
};

// Update an existing task
const updateTask = async (id, task) => {
  const allowedFields = ["title", "description", "status", "dueDate"];
  const fields = [];
  const values = [];

  for (const field of allowedFields) {
    if (task[field] !== undefined) {
      values.push(task[field]);

      if (field === "dueDate") {
        fields.push(`"dueDate" = $${values.length}`);
      } else {
        fields.push(`${field} = $${values.length}`);
      }
    }
  }

  if (fields.length === 0) {
    throw new Error(
      "At least one field (title, description, status, or dueDate) must be provided",
    );
  }

  const idPlaceholder = values.length + 1;

  const query = `
    UPDATE tasks
    SET ${fields.join(", ")}
    WHERE task_id = $${idPlaceholder}
    RETURNING *
  `;

  values.push(id);

  const result = await pool.query(query, values);
  return result.rows[0];
};

// Delete a task
const deleteTask = async (id) => {
  const query = `
    DELETE FROM tasks
    WHERE task_id = $1
    RETURNING *
  `;

  const result = await pool.query(query, [id]);
  return result.rows[0];
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
