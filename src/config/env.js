// init dotenv
require('dotenv').config();

// enviroment vars
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const VERSION = process.env.VERSION;
const NODE_ENV = process.env.NODE_ENV;

// exports vars
module.exports = {
  PORT,
  MONGO_URI,
  VERSION,
  NODE_ENV
};