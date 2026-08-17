<div align="center">
  <h1>🌟 Event Hub Server</h1>
  <p>A robust and structured RESTful API backend for Event Management, demonstrating core backend fundamentals and production-ready concepts.</p>

  <!-- Badges -->
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" alt="JWT" />
  <img src="https://img.shields.io/badge/Nodemon-76D04B?style=for-the-badge&logo=nodemon&logoColor=white" alt="Nodemon" />
</div>

<br />

## 📖 About The Project

This project serves as a foundational **Event Management API** built to showcase a deep understanding of core backend architecture. While it is a learning project, it is structured following best practices to demonstrate a solid grasp of concepts like **RESTful API design, Database Modeling, Secure Authentication, and Middleware logic.**

For a recruiter or technical reviewer, this repository reflects a clean, maintainable coding style and a strong understanding of how the pieces of a modern backend fit together.

---

## 🎯 Key Fundamentals Demonstrated

- **RESTful API Architecture:** Clean and predictable endpoint structure for CRUD operations.
- **Secure Authentication:** Implementation of `JWT (JSON Web Tokens)` for stateless, scalable user sessions.
- **Data Security:** Password hashing using `bcryptjs` to ensure database security.
- **OAuth Integration:** Logic handling for third-party authentications like Google OAuth.
- **Database Management:** Efficient use of the native `mongodb` driver, showcasing query building, document relations, and data modeling.
- **Custom Middleware:** Implementation of token verification middlewares (`verifyToken`) to securely protect private routes.

## 🛠️ Built With

Here are the core technologies utilized in this backend service:

* ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) - JavaScript runtime built on Chrome's V8 engine.
* ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) - Fast, unopinionated web framework for Node.js.
* ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) - NoSQL database program.
* ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens) - Secure token-based authentication.

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites
Make sure you have Node.js and npm installed on your machine.

### Installation

1. **Clone the repo**
   ```sh
   git clone https://github.com/alifhossinsajjad/Event-Hub-Server.git
   ```
2. **Install NPM packages**
   ```sh
   npm install
   ```
3. **Set up Environment Variables**
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=5000
   EVENT_USER=your_mongodb_username
   EVENT_PASS=your_mongodb_password
   JWT_SECRET=your_super_secret_jwt_key
   ```
4. **Run the server in development mode**
   ```sh
   npm run dev
   ```
   *The server will start on `http://localhost:5000`*

---

## 🔗 API Documentation

### 🔐 Authentication Endpoints
| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/auth/register` | Register a new user | Public |
| POST | `/api/auth/login` | Authenticate user & get token | Public |
| POST | `/api/auth/google` | Register/Login via Google OAuth | Public |

### 🎫 Event Endpoints
| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/api/events` | Get all events (supports `?search` & `?category`) | Public |
| GET | `/api/events/:id` | Get single event details | Public |
| POST | `/api/events` | Create a new event | **Private (JWT)** |
| PUT | `/api/events/:id` | Update an existing event | **Private (JWT)** |
| DELETE | `/api/events/:id` | Delete an event | **Private (JWT)** |

### 📁 Category Endpoints
| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/api/categories` | Get all unique event categories | Public |

---
<div align="center">
  <p><i>Developed with a passion for clean code and robust architecture.</i></p>
</div>
