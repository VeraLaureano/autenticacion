// import modules
const mongoose = require('mongoose');
const { logInfo, logError } = require('../utils/logs');

// connect to the db function
const connectDB = (url) => {
  mongoose.connect(url)
    .then(() => logInfo('Connected to the DB..'))
    .catch(err => logError(err));
};

module.exports = connectDB;