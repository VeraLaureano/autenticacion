// Import the 'mongoose' module
const mongoose = require('mongoose');

// Import the 'logInfo' and 'logError' functions from the '../utils/logs' module
const { logInfo, logError } = require('../utils/logs');

// Function to connect to a MongoDB database using the specified URL
const connectDB = (url) => {
  // Connect to the MongoDB database using the 'mongoose.connect()' method
  mongoose.connect(url)
    .then(() => logInfo('Connected to the DB..'))
    .catch(err => logError(err));
};

// Export the 'connectDB' function as a module
module.exports = connectDB;
