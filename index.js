// importing express
const express = require('express');
const app = express();

// importing mongoose
const mongoose = require('mongoose');

// karankumar00619_db_user
// HfhWCY1uduB7JENN

// url for mongo db atlast
const MONGODB_URI = 'mongodb+srv://karankumar00619_db_user:HfhWCY1uduB7JENN@cluster0.r0iqotg.mongodb.net/'

// port
const port = 8080;

mongoose.connect(MONGODB_URI)
.then(
    ()=>{
        // This runs if the connection is successful.
        console.log("DB connected successfully to ShoppyGlobe");

        //Start the server ONLY if the database connection is successful.
        app.listen(port, () => {
        console.log(`Server is running successfully on port ${port}!`);
    });
    }
)
.catch(
    (err) =>{
        console.log("Error connecting to DB: ", err.message);
    }
)