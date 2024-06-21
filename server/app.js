const express = require('express');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const rootRoute = require('./routes/index');
const connectDB = require('./config/database');

/**
 * -------------- GENERAL SETUP ----------------
 */


// Create the Express application
var app = express();

/**
 * -------------- DATABASE SETUP ----------------
 */

connectDB()


// Pass the global passport object into the configuration function

// This will initialize the passport object on every request
require('./config/passport')(passport);
app.use(passport.initialize());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

/**
 * -------------- ROUTES ----------------
 */

app.use(rootRoute);


/**
 * -------------- SERVER ----------------
 */

console.log("Server running on http://localhost:5000");
app.listen(5000);