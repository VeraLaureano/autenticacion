require('dotenv').config();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const VERSION = process.env.VERSION;
const NODE_ENV = process.env.NODE_ENV;
const SECRET_KEY = process.env.SECRET_KEY;

module.exports = {
  PORT,
  MONGO_URI,
  VERSION,
  NODE_ENV,
  SECRET_KEY
};