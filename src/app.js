// Import the 'express' module
const express = require('express');

// Create an instance of the 'express' application
const app = express();

// Import the 'routes' module
const routes = require('./config/routes');

// Import the 'userRouter' module
const userRouter = require('./routes/user.route');

// Import the 'dashboardRouter' module
const dashboardRouter = require('./routes/dashboard.route');

// Import the 'cors' module
const cors = require('cors');

// Import the 'authentication' middleware
const authentication = require('./middlewares/auth');

// Import the 'notFound' middleware
const notFound = require('./middlewares/notFound');

// Import the 'rateLimit' function from the 'express-rate-limit' module
const { rateLimit } = require('express-rate-limit');

// Import the 'errorHandler' middleware
const errorHandler = require('./middlewares/errorHandler');

// Create a rate limiter with specified options
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: 'draft-7',
  legacyHeaders: false
});

// Use JSON body parser middleware
app.use(express.json());

// Use URL-encoded body parser middleware with extended mode enabled
app.use(express.urlencoded({extended: true}));

// Use CORS middleware to enable cross-origin resource sharing
app.use(cors());

// Use rate limiter middleware to limit request rate
app.use(limiter);

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
