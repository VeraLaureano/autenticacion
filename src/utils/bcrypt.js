// Import the 'bcrypt' module
const bcrypt = require('bcrypt');

// Asynchronous function that encrypts a password using bcrypt
const encryptPassword = async (password) => {
  // Define the number of salt rounds
  const saltRounds = 10;

  // Generate a hashed password using bcrypt
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Return the hashed password
  return hashedPassword;
};

// Asynchronous function that compares a password with a hashed password using bcrypt
const comparePassword = async (password, hashedPassword) => {
  // Compare the password with the hashed password using bcrypt
  const isMatch = await bcrypt.compare(password, hashedPassword);

  // Return whether the password matches the hashed password
  return isMatch;
};

// Export the 'encryptPassword' and 'comparePassword' functions as an object
module.exports = {
  encryptPassword,
  comparePassword
};
