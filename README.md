# Express Server Application - Task Management

## Overview

Developed as part of the Per Scholas Software Engineering Program, this repository features an Express application primarily serving as a RESTful API for task management. It includes endpoints for managing tasks, users, and comments. Additionally, the application provides a basic web interface for listing all tasks and adding new tasks, showcasing practical use of Pug as a template engine.

## Features

- **Task Viewing**: Display all tasks on the home page.
- **Task Creation**: Users can add tasks using a form submission.
- **Task Editing**: Allows for the modification of existing tasks.
- **Task Deletion**: Users can remove tasks that are no longer needed.

## Architecture

- **Controllers**: Separate controllers for handling the logic of tasks, users, and comments.
- **Routes**: Defined routes for tasks, users, and comments ensuring RESTful API design.
- **Middleware**: Custom middleware for logging and authentication purposes.
- **Security**: Utilized bcrypt for hashing and managing user passwords.

## Technologies

- **Node.js** and **Express.js** for the server setup.
- **TypeScript**: Used for type-checking and ensuring code quality.
- **CSS**: For styling the application interface.
- **Pug**: Used as the template engine for rendering views.
- **Morgan**: A logging middleware for HTTP requests.
- **Bcrypt**: For securing user passwords.

## Installation

To set up this project locally:

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd <project-directory>
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the server:

   ```bash
   npm start
   ```

   Access the server at http://localhost:3000.

## API Endpoints

### Authentication

- POST `/login`: Authenticate a user.
- POST `/register`: Register a new user.

### Tasks

- GET `/`: Retrieve all tasks.
- GET `/new`: Display form to create a new task.
- GET `/:id`: Retrieve a specific task by ID.
- GET `/user/:user_id`: Retrieve all tasks for a specific user.
- POST `/`: Create a new task.
- PUT `/:id`: Update an existing task.
- DELETE `/:id`: Delete a task.

### Users

- GET `/`: Retrieve all users.
- GET `/:id`: Retrieve a specific user by ID.

### Comments

- GET `/task/:taskId`: Retrieve all comments for a specific task.
- POST `/`: Add a new comment.
- PUT `/:id`: Update an existing comment.
- DELETE `/:id`: Delete a comment.
