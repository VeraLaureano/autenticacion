const jwt = require('jsonwebtoken');
const validator = require('validator');
const escapeSpecialCharacters = require('../utils/escapeSpecialCharacters');
const validatePassword = require('../utils/validatePassword');
const { createUser, findOneUser, findAndUpdateUser } = require('../services/user.service');
const { encryptPassword, comparePassword } = require('../utils/bcrypt');
const { SECRET_KEY } = require('../config/env');
const { CONFLICT, BAD_REQUEST, CREATED, UNAUTHORIZED, EVERYTHING_OK, INTERNAL_SERVER_ERROR } = require('../config/statusCodes');
const { logError } = require('../utils/logs');

const postUserSignup = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    const isExistingUser = await findOneUser(email);

    if (isExistingUser)
      return res.status(CONFLICT).json({ message: 'ALREADY_A_USER_WITH_THAT_EMAIL'});

    if (!email || !validator.isEmail(email))
      return res.status(BAD_REQUEST).json({message: 'INVALID_EMAIL'});
      
    const escapedPassword = escapeSpecialCharacters(password);
    const isPasswordValid = validatePassword(escapedPassword);

    if (!password || password.length < 8 || !isPasswordValid)
      return res.status(BAD_REQUEST).json({message: 'INVALID_PASSWORD'});

    if (password !== confirmPassword)
      return res.status(BAD_REQUEST).json({message: 'PASSWORD_NOT_MATCH'});  
  
    const escapedUsername = escapeSpecialCharacters(username);
    const escapedEmail = escapeSpecialCharacters(email);
    const passwordHashed = await encryptPassword(escapedPassword);
  
    const userData = {
      username: escapedUsername,
      email: escapedEmail,
      password: passwordHashed
    };
  
    await createUser(userData);
  
    return res.status(CREATED).json({ signup: true });
  } catch (error) {
    logError(error);
  }
};

const postUserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await findOneUser(email);

    if (!user)
      return res.status(UNAUTHORIZED).json({message: 'INVALID_CREDENTIALS'});

    const isMatch = comparePassword(password, user.password);

    if (!isMatch)
      return res.status(UNAUTHORIZED).json({message: 'INVALID_CREDENTIALS'});
    
    const token = jwt.sign({userId: user._id}, SECRET_KEY, {expiresIn: '1h'});

    res.status(EVERYTHING_OK).json({token});
  } catch (error) {
    logError(error);  
  }
};

const patchUser = async (req, res) => {
  try {
    const { username, password, confirmPassword } = req.body;
    let newData = {};

    if (username) {
      const escapedUsername = escapeSpecialCharacters(username);
      newData = { ...newData, username: escapedUsername };
    }

    if (password) {
      if (password !== confirmPassword)
        return res.status(BAD_REQUEST).json({message: 'PASSWORD_NOT_MATCH'});  

      const escapedPassword = escapeSpecialCharacters(password);
      const isPasswordValid = validatePassword(escapedPassword);

      if (password.length < 8 || !isPasswordValid) 
        return res.status(BAD_REQUEST).json({message: 'INVALID_PASSWORD'});

      newData = {...newData, password: escapedPassword};
    }

    const newUser = await findAndUpdateUser(req.user._id, {...newData});
    
    if (!newUser) 
      return res.status(INTERNAL_SERVER_ERROR).json({ message: 'USER_NOT_FOUND' });
  
    req.user = newUser;
      
    return res.status(CREATED).json({ update: true, newUser });
  } catch (error) {
    logError(error);
  }
};

module.exports = {
  postUserSignup,
  postUserLogin,
  patchUser
};