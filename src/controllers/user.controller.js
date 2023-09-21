const jwt = require('jsonwebtoken');
const escapeSpecialCharacters = require('../utils/escapeSpecialCharacters');
const validatePassword = require('../utils/validatePassword');
const { createUser, findOneUser } = require('../services/user.service');
const { encryptPassword, comparePassword } = require('../utils/bcrypt');
const { SECRET_KEY } = require('../config/env');

const postUserSignup = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword)
      return res.status(400).json({message: 'PASSWORD_NOT_MATCH'});  
  
    const escapedUsername = escapeSpecialCharacters(username);
    const escapedEmail = escapeSpecialCharacters(email);
    const escapedPassword = escapeSpecialCharacters(password);
    const isPasswordValid = validatePassword(escapedPassword);
    
    if (!isPasswordValid)
      return res.status(400).json({message: 'PASSWORD_DOES_NOT_PASS_THE_VALIDATION'});
  
    const passwordHashed = encryptPassword(escapedPassword);
  
    const userData = {
      username: escapedUsername,
      email: escapedEmail,
      password: passwordHashed
    };
  
    await createUser(userData);
  
    return res.status(201).json({ signup: true });
  } catch (error) {
    console.error(error);  
  }
};

const postUserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await findOneUser(email);
    if (!user)
      return res.status(401).json({message: 'INVALID_CREDENTIALS'});

    const isMatch = comparePassword(password, user.password);

    if (!isMatch)
      return res.status(401).json({message: 'INVALID_CREDENTIALS'});
    
    const token = jwt.sign({userId: user._id}, SECRET_KEY, {expiresIn: '1h'});

    res.status(200).json({token});
  } catch (error) {
    console.error(error);  
  }
};

module.exports = {
  postUserSignup,
  postUserLogin
};