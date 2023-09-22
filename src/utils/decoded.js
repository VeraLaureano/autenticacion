const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config/env');

const decoded = (token) => {
  return jwt.verify(token, SECRET_KEY);
};

module.exports = decoded;