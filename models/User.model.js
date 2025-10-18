

//Import Mongoose to define the schema.
const mongoose = require("mongoose");

// Define the User Schema.
const userSchema = new mongoose.Schema({
    // Email is used for login, so it must be present and unique across all users.
    email: {
        type: String,
        required: true,
        unique: true, // No two users can share the same email.
        trim: true
    },
    // The user's displayed name.
    user_name: {
        type: String,
        required: true,
        trim: true
    },
    // This will store the HASHED version of the password.
    password: {
        type: String,
        required: true
    }
}, { 
    // Add timestamps for tracking when the user was created/updated.
    timestamps: true 
});

// Create the Model (Collection name will be 'Users').
const UserModel = mongoose.model('Users', userSchema);

// Export the model.
module.exports = UserModel;