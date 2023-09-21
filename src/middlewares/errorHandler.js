const { TOO_MANY_REQUEST, INTERNAL_SERVER_ERROR } = require('../config/statusCodes');
const { RateLimitError } = require('express-rate-limit');

const errorHandler = (err, req, res, next) => {
  if (err instanceof RateLimitError) {
    return res.status(TOO_MANY_REQUEST).json({ message: 'TOO_MANY_REQUEST_TRY_AGAIN_LATER' });
  }
  if (err) {
    console.error(err);
    res.status(INTERNAL_SERVER_ERROR).json({ message: 'INTERNAL_SERVER_ERROR' });
  }
  else {
    next();
  }
};

module.exports = errorHandler;