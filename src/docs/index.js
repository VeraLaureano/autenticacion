const basicInfo = require('./basicInfo');
const { servers } = require('./servers');
const { User } = require('./components');
const tags = require('./tags');
const docsPaths = require('./paths');

const schemas = {
  components: {
    schemas: {
      User
    }
  }
};

module.exports = {
  ...basicInfo,
  ...servers,
  ...schemas,
  ...tags,
  ...docsPaths
};