const { createUser } = require('../services/user.service');
const escapeSpecialCharacters = require('../utils/escapeSpecialCharacters');
const { encryptPassword } = require('../utils/bcrypt');
const validatePassword = require('../utils/validatePassword');

const postUserSignup = async (req, res) => {
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
};

module.exports = {
  postUserSignup
};