const jwt = require('jsonwebtoken');
const validator = require('validator');
const escapeSpecialCharacters = require('../utils/escapeSpecialCharacters');
const validatePassword = require('../utils/validatePassword');
const { createUser, findOneUser, findAndUpdateUser, findAndDeleteUser } = require('../services/user.service');
const { encryptPassword, comparePassword } = require('../utils/bcrypt');
const { SECRET_KEY } = require('../config/env');
const { CONFLICT, BAD_REQUEST, CREATED, UNAUTHORIZED, EVERYTHING_OK, INTERNAL_SERVER_ERROR, NO_CONTENT } = require('../config/statusCodes');
const { logError } = require('../utils/logs');

// Function to handle user signup
const postUserSignup = async (req, res) => {
  try {
    // Extract username, email, password, and confirmPassword from the request body
    const { username, email, password, confirmPassword } = req.body;

    // Check if a user with the same email already exists
    const isExistingUser = await findOneUser(email);

    // If a user with the same email exists, return a conflict response
    if (isExistingUser)
      return res.status(CONFLICT).json({ message: 'ALREADY_A_USER_WITH_THAT_EMAIL'});

    // Validate the email format using a validator library
    if (!email || !validator.isEmail(email))
      return res.status(BAD_REQUEST).json({message: 'INVALID_EMAIL'});
      
    // Escape special characters in the password and validate its format
    const escapedPassword = escapeSpecialCharacters(password);
    const isPasswordValid = validatePassword(escapedPassword);

    // If the password is missing, too short, or invalid, return a bad request response
    if (!password || password.length < 8 || !isPasswordValid)
      return res.status(BAD_REQUEST).json({message: 'INVALID_PASSWORD'});

    // If the password and confirmPassword do not match, return a bad request response
    if (password !== confirmPassword)
      return res.status(BAD_REQUEST).json({message: 'PASSWORD_NOT_MATCH'});  
  
    // Escape special characters in the username and email
    const escapedUsername = escapeSpecialCharacters(username);
    const escapedEmail = escapeSpecialCharacters(email);

    // Hash the password using a bcrypt library
    const passwordHashed = await encryptPassword(escapedPassword);
  
    // Create a user data object with escaped values
    const userData = {
      username: escapedUsername,
      email: escapedEmail,
      password: passwordHashed
    };
  
    // Create the user in the database
    await createUser(userData);
  
    // Return a created response with a signup flag set to true
    return res.status(CREATED).json({ signup: true });
  } catch (error) {
    // Log any errors that occur during execution
    logError(error);
  }
};


// Function to handle user login
const postUserLogin = async (req, res) => {
  try {
    // Extract email and password from the request body
    const { email, password } = req.body;

    // Find the user with the specified email
    const user = await findOneUser(email);

    // If no user is found, return an unauthorized response
    if (!user)
      return res.status(UNAUTHORIZED).json({message: 'INVALID_CREDENTIALS'});

    // Compare the provided password with the stored password hash
    const isMatch = comparePassword(password, user.password);

    // If the passwords do not match, return an unauthorized response
    if (!isMatch)
      return res.status(UNAUTHORIZED).json({message: 'INVALID_CREDENTIALS'});
    
    // Generate a JSON Web Token (JWT) for the authenticated user
    const token = jwt.sign({userId: user._id}, SECRET_KEY, {expiresIn: '1h'});

    // Return a response with the generated token
    res.status(EVERYTHING_OK).json({token});
  } catch (error) {
    // Log any errors that occur during execution
    logError(error);  
  }
};

// Function to handle user patch request
const patchUser = async (req, res) =>  {
  try {
    // Extract username, password, and confirmPassword from the request body
    const { username, password, confirmPassword } = req.body;
    let newData = {};

    // If username is provided, escape special characters and add it to newData object
    if (username) {
      const escapedUsername = escapeSpecialCharacters(username);
      newData = { ...newData, username: escapedUsername };
    }

    // If password is provided, validate it and add it to newData object
    if (password) {
      // Check if password and confirmPassword match
      if (password !== confirmPassword)
        return res.status(BAD_REQUEST).json({message: 'PASSWORD_NOT_MATCH'});  

      // Escape special characters in the password and validate its format
      const escapedPassword = escapeSpecialCharacters(password);
      const isPasswordValid = validatePassword(escapedPassword);

      // If password is too short or invalid, return a bad request response
      if (password.length < 8 || !isPasswordValid) 
        return res.status(BAD_REQUEST).json({message: 'INVALID_PASSWORD'});

      newData = {...newData, password: escapedPassword};
    }

    // Find and update the user with the specified ID using newData object
    const newUser = await findAndUpdateUser(req.user._id, {...newData});
    
    // If no user is found, return an internal server error response
    if (!newUser) 
      return res.status(INTERNAL_SERVER_ERROR).json({ message: 'USER_NOT_FOUND' });
  
    // Update the req.user object with the new user data
    req.user = newUser;
      
    // Return a created response with an update flag and the new user data
    return res.status(CREATED).json({ update: true });
  } catch (error) {
    // Log any errors that occur during execution
    logError(error);
  }
};

// Function to handle user deletion
const deleteUser = async (req, res) => {
  try {
    // Extract confirmUsername and isSure from the request body
    const { confirmUsername, isSure } = req.body;

    // Extract _id and username from the req.user object
    const { _id, username } = req.user;

    // If confirmUsername or isSure is missing, return a bad request response with an appropriate message
    if (!confirmUsername || !isSure)
      return res.status(BAD_REQUEST).json({message: 'DELETE_NOT_CONFIRM'});

    // If confirmUsername does not match the username, return a bad request response with an appropriate message
    if (confirmUsername !== username) 
      return res.status(BAD_REQUEST).json({message: 'USERNAME_NOT_MATCH'});

    // Find and delete the user with the specified _id
    await findAndDeleteUser(_id);

    // Return a no content response with a delete flag set to true
    return res.status(NO_CONTENT).json({delete: true});    
  } catch (error) {
    // Log any errors that occur during execution
    logError(error);
  }
};

 
module.exports = {
  postUserSignup,
  postUserLogin,
  patchUser,
  deleteUser
};