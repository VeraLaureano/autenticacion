// Import the 'jsonwebtoken' module
const jwt = require('jsonwebtoken');

// Import the 'SECRET_KEY' constant from the '../config/env' module
const { SECRET_KEY } = require('../config/env');

// Function that decodes a JSON Web Token (JWT)
const decoded = (token) => {
  // Verify the token using the 'jsonwebtoken' module and the 'SECRET_KEY'
  return jwt.verify(token, SECRET_KEY);
};

// Export the 'decoded' function as a module
module.exports = decoded;
