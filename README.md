# Task Manager API

A RESTful Task Manager API built with **Node.js, Express.js, and PostgreSQL**. This backend allows users to create, read, update, delete, filter, and sort tasks through REST API endpoints.

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- pg (node-postgres)
- dotenv
- CORS

## Features

- Create, read, update, and delete tasks (CRUD).
- Get all tasks and retrieve a task by ID.
- Filter tasks by status and due date.
- Sort tasks by creation date, due date, and title.
- Dynamic SQL queries for flexible task updates.
- Input validation middleware.
- Validate task title, status, and due date.
- Support for PUT and PATCH requests.
- Centralized error handling.
- PostgreSQL connection pooling.
- Parameterized SQL queries to help prevent SQL injection.

## Project Structure

```text
task_manager/
│
├── controllers/
│   └── tasksController.js
│
├── middleware/
│   ├── errorHandler.js
│   ├── validateTask.js
│   ├── validateTaskFilter.js
│   └── validateTaskSort.js
│
├── models/
│   └── tasksModel.js
│
├── routes/
│   └── tasksRoute.js
│
├── utils/
│   └── sendValidationError.js
│
├── db.js
├── server.js
├── task_manager.sql
├── package.json
├── package-lock.json
└── .gitignore
```

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/maryamaslam-tech/task-manager-api.git
```

### 2. Navigate to the Project Folder

```bash
cd task-manager-api
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
DB_USER=your_database_user
DB_HOST=localhost
DB_NAME=task_manager_api
DB_PASSWORD=your_database_password
DB_PORT=5432
```

Replace the database credentials with your own PostgreSQL configuration.

### 5. Set Up the Database

- Create a PostgreSQL database named `task_manager_api`.
- Run the SQL commands from `task_manager.sql` in that database.

### 6. Start the Server

```bash
npm start
```

The API will run at:

```text
http://localhost:5000
```

## API Endpoints

Base URL: `/tasks`

| Method | Endpoint     | Description             |
| ------ | ------------ | ----------------------- |
| GET    | `/tasks`     | Get all tasks           |
| GET    | `/tasks/:id` | Get a task by ID        |
| POST   | `/tasks`     | Create a new task       |
| PUT    | `/tasks/:id` | Replace/update a task   |
| PATCH  | `/tasks/:id` | Partially update a task |
| DELETE | `/tasks/:id` | Delete a task           |

### Task Status Values

- `pending`
- `in_progress`
- `completed`

### Filtering and Sorting

The API supports filtering tasks by status and due date, and sorting by:

- `created_at`
- `dueDate`
- `title`

## Error Handling

The API includes input validation and centralized error handling to manage invalid requests and unexpected server errors.

## Current Project Status

Backend development completed. Frontend development is in progress.

## Author

**Maryam**

GitHub: [maryamaslam-tech](https://github.com/maryamaslam-tech)
