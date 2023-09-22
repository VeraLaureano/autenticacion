// Import modules
const express = require('express');
const app = express();
const routes = require('./config/routes');
const userRouter = require('./routes/user.route');
const dashboardRouter = require('./routes/dashboard.route');
const cors = require('cors');
const authentication = require('./middlewares/auth');
const notFound = require('./middlewares/notFound');
const limiter = require('express-limiter');
const errorHandler = require('./middlewares/errorHandler');

// Create a rate limiter with specified options
const limiterOptions = {
  path: '*',
  method: 'all',
  lookup: ['connection.remoteAddress'],
  total: 100,
  expire: 1000 * 60 * 15,
};

// Use JSON body parser middleware
app.use(express.json());
// Use URL-encoded body parser middleware with extended mode enabled
app.use(express.urlencoded({extended: true}));
// Use CORS middleware to enable cross-origin resource sharing
app.use(cors());
// Use rate limiter middleware to limit request rate
app.use(limiter(limiterOptions));
// Define a route handler for the root path ('/')
app.get('/', (req, res) => {
  res.send('<h1>Auth service</h1>');
});

// Use the 'userRouter' for routes starting with '/user'
app.use(routes.user, userRouter);
// Use the 'dashboardRouter' for routes starting with '/dashboard'
app.use(routes.dashboard, authentication, dashboardRouter);
// Use the 'notFound' middleware for handling undefined routes
app.use(notFound);

// Use the 'errorHandler' middleware for handling errors
app.use(errorHandler);

// Export the 'app' instance as a module
module.exports = app;
