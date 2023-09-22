// Import the 'app' module
const app = require('./app');

// Import the 'connectDB' module
const connectDB = require('./config/connectDB');

// Import the 'MONGO_URI' and 'PORT' variables from the 'env' module
const { MONGO_URI, PORT } = require('./config/env');

// Import the 'logError' and 'logInfo' functions from the 'logs' module
const { logError, logInfo } = require('./utils/logs');

// Asynchronous function that executes immediately
(async () => {
  try {
    // Start the server and listen on the specified port
    app.listen(PORT, () => {
      logInfo(`Server listening on port ${PORT}`);
    });

    // Connect to the MongoDB database using the specified URI
    connectDB(MONGO_URI);
  } catch (err) {
    // Log any errors that occur during execution
    logError(err);
  }
})();
