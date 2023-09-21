const express = require('express');
const app = express();
const routes = require('./config/routes');
const userRouter = require('./routes/user.route');
const dashboardRouter = require('./routes/dashboard.route');
const cors = require('cors');
const authentication = require('./middlewares/auth');
const notFound = require('./middlewares/notFound');
const { rateLimit } = require('express-rate-limit');
const errorHandler = require('./middlewares/errorHandler');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: 'draft-7',
  legacyHeaders: false
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(limiter);

app.get('/', (req, res) => {
  res.send('<h1>Auth service</h1>');
});

app.use(routes.user, userRouter);
app.use(routes.dashboard, authentication, dashboardRouter);

app.use(notFound);

app.use(errorHandler);

module.exports = app;