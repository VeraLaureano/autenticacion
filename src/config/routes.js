const { VERSION } = require('./env');

const routes = {
  user: `/api/${VERSION}/user`,
  dashboard: `/api/${VERSION}/dashboard`,
  docs: '/api-docs'
};

module.exports = routes;