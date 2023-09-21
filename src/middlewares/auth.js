const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config/env');
const { logError } = require('../utils/logs');
const { findUserAuth } = require('../services/user.service');

const authentication = async (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith('Bearer '))
    return res.status(401).json({message: 'UNAUTHORIZED'});

  const token = auth.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.userId;
    const user = await findUserAuth(userId);

    if (!user)
      return res.status(401).json({message: 'USER_NOT_FOND'});
    
    req.user = user;
    next();
  } catch (error) {
    logError(error);
    return res.status(401).json({message: 'AUTHENTICATION_FAILED'});
  }  
};

module.exports = authentication;