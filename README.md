Github link: https://github.com/Karan-666/e-commerce-app-backed

# ShoppyGlobe E-commerce Backend API

This project is the backend API for a minimal e-commerce platform called ShoppyGlobe. It is built using the MERN stack (Node.js, Express.js) and implements a secure system for user authentication and managing a shopping cart.

## 🎯 Project Objectives

This API was developed following an assignment requirement to demonstrate mastery of:

- **MVC Architecture** (Models, Controllers, Routes)
- **MongoDB Integration** (Mongoose Schemas, referencing, and CRUD)
- **Authentication** (User Registration and Login with bcrypt)
- **Authorization** (Protecting routes using JWT Verification Middleware)
- **RESTful API Design** (Products and Cart CRUD)

## 📦 Technologies Used

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: bcrypt (Password Hashing) and jsonwebtoken (JWT Tokens)
- **Utilities**: cors, nodemon

## 🚀 Setup and Installation

Follow these steps to get the ShoppyGlobe API running on your local machine.

### 1. Clone and Install Dependencies

```bash
# 1. Clone the repository (replace with your actual URL)
git clone <YOUR_REPO_URL>
cd shoppyglobe-backend

# 2. Install required packages
npm install
```

### 2. Configure MongoDB Atlas

Since this project connects to a cloud database, you must configure your connection string.

1. Create a database named `ShoppyGlobe` in your MongoDB Atlas account.
2. In Atlas, navigate to Network Access and set your IP Address to "Allow Access from Anywhere" (`0.0.0.0/0`) for testing.
3. Open `index.js` and update the `MONGODB_URI` constant with your actual credentials:

```javascript
const MONGODB_URI = 'mongodb+srv://<USER_NAME>:<PASSWORD>@<CLUSTER_URL>/ShoppyGlobe?retryWrites=true&w=majority';
```

### 3. Run the Server

```bash
# Starts the server using nodemon for automatic restarts
npm run start
```

You should see console messages confirming successful DB and Server connection on port 8080.

## 🔑 API Endpoints

All endpoints run on `http://localhost:8080`.

| Category | Method | Path | Description | Access |
|----------|--------|------|-------------|---------|
| Authentication | `POST` | `/register` | Creates a new user account (hashes password) | Public |
| Authentication | `POST` | `/login` | Authenticates user and returns JWT `accessToken` | Public |
| Products | `GET` | `/products` | Retrieves all products from the database | Public |
| Products | `GET` | `/products/:id` | Retrieves details of a single product | Public |
| Cart | `POST` | `/cart` | Adds a product/quantity to the user's cart | Protected (JWT) |
| Cart | `GET` | `/cart` | Retrieves all items in the logged-in user's cart (with product details via populate) | Protected (JWT) |
| Cart | `PUT` | `/cart/:id` | Updates the quantity of a specific cart item | Protected (JWT) |
| Cart | `DELETE` | `/cart/:id` | Removes a specific item from the cart | Protected (JWT) |

## 🔒 Authorization Requirement

To access any protected **Cart** route, the client must include the following HTTP header, using the token received from the successful `/login` endpoint:

```
Key: Authorization
Value: JWT <your_access_token>
```