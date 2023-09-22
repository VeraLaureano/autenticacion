// Import the 'NODE_ENV' constant from the '../config/env' module
const { NODE_ENV } = require('../config/env');

const logInfo = (...args) => {
  // Only if mode is development log info
  if (NODE_ENV === 'development') {
    console.log(...args);
  }
};

const logError = (...args) => {
  // Only if mode is development throw error
  if (NODE_ENV === 'development') {
    console.error(...args);
  }
};

// Export loggers
module.exports = {
  logInfo,
  logError
};