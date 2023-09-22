const { logError } = require('../utils/logs');
const { findUserAuth } = require('../services/user.service');
const { UNAUTHORIZED } = require('../config/statusCodes');
const decoded = require('../utils/decoded');

const authentication = async (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith('Bearer '))               
    return res.status(UNAUTHORIZED).json({message: 'UNAUTHORIZED'});

  const token = auth.split(' ')[1];

  try {
    const { userId } = decoded(token);
    const user = await findUserAuth(userId);

    if (!user)
      return res.status(UNAUTHORIZED).json({message: 'USER_NOT_FOND'});
    
    req.user = user;
    next();
  } catch (error) {
    logError(error);
    return res.status(UNAUTHORIZED).json({message: 'AUTHENTICATION_FAILED'});
  }  
};

module.exports = authentication;