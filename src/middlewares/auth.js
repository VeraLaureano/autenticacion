// Import the 'logError' function from the '../utils/logs' module
const { logError } = require('../utils/logs');

// Import the 'findUserAuth' function from the '../services/user.service' module
const { findUserAuth } = require('../services/user.service');

// Import the 'UNAUTHORIZED' constant from the '../config/statusCodes' module
const { UNAUTHORIZED } = require('../config/statusCodes');

// Import the 'decoded' function from the '../utils/decoded' module
const decoded = require('../utils/decoded');

// Asynchronous middleware function for authentication
const authentication = async (req, res, next) => {
  // Extract the 'authorization' header from the request
  const auth = req.headers.authorization;

  // If 'authorization' header is missing or does not start with 'Bearer ', return an unauthorized response
  if (!auth || !auth.startsWith('Bearer '))               
    return res.status(UNAUTHORIZED).json({message: 'UNAUTHORIZED'});

  // Extract the token from the 'authorization' header
  const token = auth.split(' ')[1];

  try {
    // Decode the token to get the userId
    const { userId } = decoded(token);

    // Find the user with the specified userId
    const user = await findUserAuth(userId);

    // If no user is found, return an unauthorized response
    if (!user)
      return res.status(UNAUTHORIZED).json({message: 'USER_NOT_FOND'});
    
    // Set the req.user object to the found user
    req.user = user;

    // Call the next middleware function
    next();
  } catch (error) {
    // Log any errors that occur during execution
    logError(error);

    // Return an unauthorized response with an appropriate message
    return res.status(UNAUTHORIZED).json({message: 'AUTHENTICATION_FAILED'});
  }  
};

// Export the authentication middleware function
module.exports = authentication;
