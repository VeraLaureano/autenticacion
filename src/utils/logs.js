// import NODE_ENV var
const { NODE_ENV } = require('../config/env');

const logInfo = (...args) => {
  // only if mode is development log info
  if (NODE_ENV === 'development') {
    console.log(...args);
  }
};

const logError = (...args) => {
  // only if mode is development throw error
  if (NODE_ENV === 'development') {
    console.error(...args);
  }
};

// export loggers
module.exports = {
  logInfo,
  logError
};