const express = require('express');
const routes = require('./config/routes');
const userRouter = require('./routes/user.route');
const dashboardRouter = require('./routes/dashboard.route');
const app = express();
const cors = require('cors');
const authentication = require('./middlewares/auth');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.get('/', (req, res) => {
  res.send('<h1>Auth service</h1>');
});

app.use(routes.user, userRouter);
app.use(routes.dashboard, authentication, dashboardRouter);

module.exports = app;