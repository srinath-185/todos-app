Here’s a README.md file for Task Management API project:

# Task Management API

This is a simple **Task Management API** built using **Node.js**, **Express.js**, and **SQLite**. 
It allows users to create, edit, view, mark as completed, and delete tasks. 
The API also includes Swagger documentation for easy API reference.

## Table of Contents
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
  - [Task API Routes](#task-api-routes)
- [Swagger Documentation](#swagger-documentation)
- [Project Structure](#project-structure)
- [License](#license)

## Getting Started

### Prerequisites
Make sure you have the following installed on your system:
- **Node.js**: [Download and Install Node.js](https://nodejs.org/)
- **npm**: Node package manager (comes with Node.js)
- **SQLite**: Database used for storing tasks (included as part of this project).

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/srinath-185/todos-app.git

Navigate to the project directory:
cd todos-app

Install the dependencies:
npm install

Create the SQLite database todolist.db in the root directory of your project. You can simply start the server, and the database will be automatically created.

Running the Application
To run the API server:
npm start
The server will be running at http://localhost:3000.

Accessing Swagger API Documentation
Once the server is running, the Swagger API documentation can be accessed at:

http://localhost:3000/api-docs
API Endpoints
Task API Routes
Create a new task: POST /api/task/createTask

Request Body:
json

{
  "task_name": "Task name",
  "task_title": "Task title",
  "task_description": "Task description"
}
Edit a task: PUT /api/task/editTask

Request Body:
json

{
  "task_id": 1,
  "task_name": "Updated task name",
  "task_title": "Updated task title",
  "task_description": "Updated task description"
}
View all tasks: GET /api/task/viewTasks

Mark a task as completed: POST /api/task/markTaskCompleted

Request Body:
json

{
  "task_id": 1
}
Delete a task (soft delete): DELETE /api/task/deleteTask

Request Body:
json

{
  "task_id": 1
}
Swagger Documentation
This project includes Swagger API documentation for easier interaction with the API. The documentation provides detailed information about each API endpoint, request body parameters, and response formats.

Swagger documentation is available at:
http://localhost:3000/api-docs

# Project Structure

├── api.js               # Main API file with task routes and database logic
├── server.js            # Entry point for the application
├── swagger.js           # Swagger setup for documentation
├── swagger.yaml         # Swagger configuration and routes definition
├── package.json         # Project configuration and dependencies
├── README.md            # Documentation for the project
└── todolist.db          # SQLite database file (auto-created)
License
This project is licensed under the MIT License. See the LICENSE file for more details.

### Steps to Customize
- Replace `your-repo` in the `git clone` command with your actual repository URL.
- You may want to add a **Contributing** section if you're working in a team.
