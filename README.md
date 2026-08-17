# Event Hub Server

A robust, scalable, and fully functional RESTful API backend for an Event Management system. Built with Node.js, Express.js, and MongoDB, this server provides secure authentication, event management, and user handling.

## 🚀 Why is this project perfect for Beginners & Learning?

This project is an absolute goldmine for freshers or developers starting with backend development because it covers all the core concepts of a modern backend application without being overly complex:

1. **Clear & Simple Structure**: Everything is cleanly laid out in a way that's easy to trace. No convoluted architectures—just straightforward routing and database interactions.
2. **Core Authentication**: Implements real-world authentication using **JWT (JSON Web Tokens)** and **bcryptjs** for password hashing.
3. **Third-Party Auth Integration**: Shows how to handle **Google OAuth** logic on the backend.
4. **Complete CRUD Operations**: Demonstrates how to Create, Read, Update, and Delete data (Events) properly in MongoDB.
5. **Middleware Usage**: Uses custom middleware (`verifyToken`) to protect private routes, teaching how authorization works.
6. **Search & Filter Logic**: Shows how to implement search and category filtering using MongoDB queries.

## 🏭 Why is this Production-Ready?

Despite its beginner-friendly codebase, this project is built using production-grade standards:

1. **Secure Passwords**: Passwords are never saved in plain text. They are hashed using `bcrypt` (with a strong salt round of 12).
2. **Stateless Authentication**: JWT is used for session management, meaning the backend doesn't need to store session data, making it highly scalable across multiple servers.
3. **Security Middleware**: Configured with `cors` to restrict/allow cross-origin requests and handles environment variables securely via `dotenv`.
4. **MongoDB Native Driver**: Uses the official `mongodb` driver with optimized queries, ready to handle large-scale data on MongoDB Atlas.
5. **Error Handling**: Implements `try-catch` blocks for asynchronous operations to prevent server crashes and return appropriate HTTP status codes.

---

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs
- **Environment**: dotenv

## 📦 Installation & Setup

1. **Clone the repository** (if applicable)
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Environment Variables**: Create a `.env` file in the root directory and add the following:
   ```env
   PORT=5000
   EVENT_USER=your_mongodb_username
   EVENT_PASS=your_mongodb_password
   JWT_SECRET=your_super_secret_jwt_key
   ```
4. **Run the server**:
   ```bash
   npm run dev
   ```
   *The server will start on `http://localhost:5000`*

## 🔗 API Endpoints

### 🔐 Authentication
- `POST /api/auth/register` - Register a new user (Requires: name, email, password)
- `POST /api/auth/login` - Login user (Requires: email, password)
- `POST /api/auth/google` - Register/Login via Google

### 🎫 Events
- `GET /api/events` - Get all events (Supports `?search=` and `?category=` queries)
- `GET /api/events/:id` - Get a single event by ID
- `POST /api/events` - Create a new event *(Protected Route)*
- `PUT /api/events/:id` - Update an event *(Protected Route)*
- `DELETE /api/events/:id` - Delete an event *(Protected Route)*

### 📁 Categories
- `GET /api/categories` - Get all unique event categories

---

*Built with ❤️ for Event Management.*
