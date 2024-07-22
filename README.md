Introduction
The Task Management Application is designed to allow users to create, update, and manage tasks within different columns, similar to Trello. Users can sign up, log in, and move tasks between columns using drag-and-drop functionality. Authentication is required for accessing all pages, with an option for Google login.

Features
User registration and login, including Google login.
Task creation, updating, and deletion.
Drag-and-drop functionality to move tasks between columns.
Responsive user interface based on provided mock designs.
Authentication required on every page.
Architecture
The application follows a client-server architecture:

Frontend: Built using React with routing and state management.
Backend: Built using Node.js and Express, providing a RESTful API.
Database: MongoDB for storing user and task data.
Technologies Used
Frontend: React, React Router
Backend: Node.js, Express.
Database: MongoDB.
Authentication: JWT
Version Control: Git.


Security Measures
Password Hashing: Using bcryptjs.
Environment Variables: Storing sensitive data in .env files.
CORS: Configured for cross-origin requests.
