const app = require('./app');
const connectDB = require('./config/connectDB');
const { MONGO_URI, PORT } = require('./config/env');
const { logError, logInfo } = require('./utils/logs');

(async () => {
  try {
    app.listen(PORT, () => {
      logInfo(`Server listening on port ${PORT}`);
    });
    connectDB(MONGO_URI);
  } catch (err) {
    logError(err);
  }
})();