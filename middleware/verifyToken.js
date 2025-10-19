const jwt = require("jsonwebtoken");

const UserModel = require("../models/User.model");

// defining secret key
const secretKey = "supersecretkey";

function verifyToken(req, res, next) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT" //// Check if the first word is 'JWT'
  ) {
    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(
      token,
      secretKey,
      // decodedPayload contains { id: user._id, ... }
      async function (err, decodedPayload) {
        if (err) {
          // If verification fails (expired or wrong signature).
          return res
            .status(403)
            .json({ message: "Invalid or expired JWT Token." });
        }

        try {
          // if Token is valid, Find the user in the DB using the ID from the payload.

          let user = await UserModel.findById(decodedPayload.id);

          // checking if user exist with that id final time
          if (!user) {
            return res
              .status(404)
              .json({ message: "User associated with this token not found." });
          }

          //Attach the user object to the request object.
          //This allows subsequent controllers (like Cart) to access req.user.
          // basically adding a new property named user in request object with value as user for further controller
          req.user = user;

          next();
        } catch (dbError) {
          return res
            .status(500)
            .json({ message: "Server error while fetching user from token." });
        }
      }
    );
  } else {
    // If no token or incorrect header format is provided.
    return res
      .status(401)
      .json({
        message: "Authorization header (JWT <token>) not found or malformed.",
      });
  }
}

module.exports = verifyToken;
