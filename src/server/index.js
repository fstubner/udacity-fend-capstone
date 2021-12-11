// Importing environment variables
require('dotenv').config();

// Initialising express app and middleware
const EXPRESS = require('express');
const APP = EXPRESS();
APP.use(EXPRESS.json());
APP.use(EXPRESS.urlencoded({ extended: true }))
APP.use(EXPRESS.static('dist'));

// Setting up CORS
const CORS = require('cors');
APP.use(CORS());

// Setting up routes
APP.use(require('./routes'));

// Starting express server
const PORT = 8080;
APP.listen(PORT, (listening));

/**
* @description Callback function for Express server.
*/
function listening() {
    console.log(`Server started on http://localhost:${PORT}`)
}