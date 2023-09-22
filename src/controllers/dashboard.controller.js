// Import the 'EVERYTHING_OK' constant from the '../config/statusCodes' module
const { EVERYTHING_OK } = require('../config/statusCodes');

// Asynchronous function that handles the 'getDashboard' route
const getDashboard = async (req, res) => {
  // Extract _id, username, and email from the req.user object
  const { _id, username, email } = req.user;

  // Return a response with status code 'EVERYTHING_OK' and an object containing _id, username, and email
  return res.status(EVERYTHING_OK).json({_id, username, email});
};

// Export an object containing the 'getDashboard' function as a module
module.exports = {
  getDashboard
};
