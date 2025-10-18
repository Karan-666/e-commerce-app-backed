////////// Imports //////////////
// Import the UserModel to interact with the database.
const UserModel = require("../models/User.model");
// Import bcrypt to securely hash passwords.
const bcrypt = require("bcrypt");
// jwt tokens
const jwt = require("jsonwebtoken");

///////// User registration logic ////////////

async function register(req, res) {
  try {
    const { email, user_name, password } = req.body;

    //Check if a user with the provided email already exists in the database.
    const data = await UserModel.findOne({ email });

    //If 'data' is found, the email already exists. Send a 409 Conflict error.
    if (data) {
      return res.status(409).json({
        message:
          "Email is already registered. Please login or use a different email.",
      });
    } else {
      // syntax: // bcrypt.hashSync(plainTextPassword, saltRounds)
      const hash = bcrypt.hashSync(password, 10);

      // creating new object
      // model.create push new object to db
      const newUser = await UserModel.create({
        email, // Same as email: email (JS shorthand)
        user_name, // Same as user_name: user_name
        password: hash, //// Store the hashed password, not the plain text one.
      });

      // sending response

      return res.status(201).json({
        user: {
          email: newUser.email,
          user_name: newUser.user_name,
        },
        message: "User registered successfully!",
      });
    }
  } catch (err) {
    // handling server side error
    return res.status(500).json({
      message: "Error during user registration.",
    });
  }
}

///////// Login Logic ///////////////

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const data = await UserModel.findOne({ email });

    if (!data) {
      return res.status(404).json({
        message: "Given email is not registered",
      });
    }

    // comparing normal pass in passed body vs hashed pass in db
    const validPassword = bcrypt.compareSync(password, data.password);

    if (!validPassword) {
      // If passwords do NOT match, send a 401 Unauthorized error.
      return res.status(401).json({
        message: "Invalid credentials (password is wrong).",
      });
    }

    return res.status(200).json({ message: "User authenticated successfully. Ready for token generation." });

  } catch (err) {
    // handling server side error
    return res.status(500).json({
      message: "Error during user registration.",
    });
  }
}

// We export the functions.
module.exports = {
  register,
  login,
};
