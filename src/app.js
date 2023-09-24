// Import modules
const express = require('express');
const app = express();
const routes = require('./config/routes');
const userRouter = require('./routes/user.route');
const dashboardRouter = require('./routes/dashboard.route');
const docsRouter = require('./routes/docs.route');
const cors = require('cors');
const authentication = require('./middlewares/auth');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');
const { serve } = require('swagger-ui-express');

// Use JSON body parser middleware
app.use(express.json());
// Use URL-encoded body parser middleware with extended mode enabled
app.use(express.urlencoded({extended: true}));
// Use CORS middleware to enable cross-origin resource sharing
app.use(cors());
// Use express static to setup a public directory
app.use(express.static('public'));

// Use the 'userRouter' for routes starting with '/user'
app.use(routes.user, userRouter);
// Use the 'dashboardRouter' for routes starting with '/dashboard'
app.use(routes.dashboard, authentication, dashboardRouter);
// Use the 'docsRouter' for routes 'api-docs'
app.use(routes.docs, serve, docsRouter);
// Use the 'notFound' middleware for handling undefined routes
app.use(notFound);

// Use the 'errorHandler' middleware for handling errors
app.use(errorHandler);

// Export the 'app' instance as a module
module.exports = app;
