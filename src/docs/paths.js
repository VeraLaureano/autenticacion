const postSignupUserDocV1 = require('./user/signup-user');
const postLoginUserDocV1 = require('./user/login-user');
const deleteUserDocV1 = require('./user/delete-user');
const patchUserDocV1 = require('./user/patch-user');

const docsPaths = {
  paths: {
    '/api/v1/user': {
      ...deleteUserDocV1,
      ...patchUserDocV1
    },
    '/api/v1/user/signup': {
      ...postSignupUserDocV1
    },
    '/api/v1/user/login': {
      ...postLoginUserDocV1
    }
  }
};

module.exports = docsPaths;