# Placement Cell Web Application

This is a web application for managing student interviews for Team Career Camp. Employees can fill in data into the database and download it in CSV format. The application allows users to sign up and sign in, manage student details, schedule interviews, and track interview results.

## Features

- **User Authentication:** Sign up and sign in for employees.
- **Student Management:** View and add new students.
- **Interview Management:** Create and view interviews, allocate students, and mark results.
- **CSV Download:** Download a complete CSV file containing all relevant data.

  ## Technologies Used

- **Node.js**: A JavaScript runtime for building scalable server-side applications.
- **Express.js**: A web application framework for Node.js, used for building RESTful APIs.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.
- **MongoDB**: A NoSQL database for storing application data.
- **jsonwebtoken**: A library for implementing JSON Web Tokens (JWT) for authentication.
- **bcrypt**: A library for hashing passwords securely.
- **express-validator**: A library for validating and sanitizing user input.
- **cookie-parser**: Parse Cookie header and populate req.cookies with an object keyed by the cookie names
- **exceljs**: A library for reading, manipulating, and writing Excel files
  **CORS (Cross-Origin Resource Sharing)**: A security feature that allows or restricts resources on a web server to be requested from another domain. CORS is configured in the Express.js backend to allow secure cross-origin requests, enabling the front-end application to access the API hosted on a different domain.

### Development Tools

- **Postman**: A tool for testing APIs.
- **Nodemon**: A tool that helps develop Node.js applications by automatically restarting the server when file changes are detected.
- **Git**: Version control system for tracking changes in source code.
- **Visual Studio Code**: Code editor for developing and debugging applications.

### Folder structure

placement-cell--backend
│
├── node_modules
│
├── src
│ ├── config
│ │ └── database.js
│ │
│ │
│ ├── middlewares
│ │ └── auth.middleware.js
│ │
│ ├── models
│ │ ├── interview.model.js
│ │ ├── result.model.js
│ │ |── students.model.js
| | └── user.model.js
│ │
│ ├── routers
│ │ ├── interviews.router.js
│ │ ├── result.router.js
│ │ ├── students.router.js
│ │ └── user.router.js
│ │
│ |── utils
| | └── database.js
│
├── .gitignore # Files to ignore in version control
├── app.js
├── package.json # Project metadata and dependencies
├── package-lock.json # Locked versions of dependencies
└── README.md # Project documentation
