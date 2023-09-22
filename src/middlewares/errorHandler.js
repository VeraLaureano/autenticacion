// Import the 'TOO_MANY_REQUEST' and 'INTERNAL_SERVER_ERROR' constants from the '../config/statusCodes' module
const { TOO_MANY_REQUEST, INTERNAL_SERVER_ERROR } = require('../config/statusCodes');

// Define an error handler middleware function named 'errorHandler'
const errorHandler = (err, _req, res, next) => {
  // If the error message contains 'Rate limit', return a response with status code 'TOO_MANY_REQUEST'
  if (err && err.message.includes('Rate limit')) {
    return res.status(TOO_MANY_REQUEST).json({ message: 'TOO_MANY_REQUEST_TRY_AGAIN_LATER' });
  }
  
  // If there is any other error, log it to the console and return a response with status code 'INTERNAL_SERVER_ERROR'
  if (err) {
    console.error(err);
    res.status(INTERNAL_SERVER_ERROR).json({ message: 'INTERNAL_SERVER_ERROR' });
  }
  else {
    next();
  }
};


// Export the 'errorHandler' middleware function
module.exports = errorHandler;
