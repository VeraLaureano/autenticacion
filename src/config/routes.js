const { VERSION } = require('./env');

const routes = {
  user: `/api/${VERSION}/user`,
  dashboard: `/api/${VERSION}/dashboard`
};

module.exports = routes;