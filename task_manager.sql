CREATE DATABASE task_manager_api;
CREATE TABLE tasks(
    task_id SERIAL PRIMARY KEY,
    title VARCHAR(225) NOT NULL,
    description TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    "dueDate" DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
