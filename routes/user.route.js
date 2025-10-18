// We will import the actual functions from the controller
const { register, login } = require("../controllers/user.controller");

// This function is responsible for defining all the routes (endpoints) for user authentication.
function userRoutes(app) {
  // POST /register: Route to create a new user account.
  app.post("/register", register); // 'register' is the logic function (Controller)

  // POST /login: Route to authenticate a user and receive a JWT token.
  app.post("/login", login); // 'login' is the logic function (Controller)
}

// 4. We export the function so it can be imported and called in index.js.
module.exports = userRoutes;
