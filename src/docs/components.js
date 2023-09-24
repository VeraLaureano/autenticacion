const User = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      description: 'Unique user name',
      example: 'myName'
    },
    email: {
      type: 'string',
      description: 'Unique user email',
      example: 'hello@example.com'
    },
    password: {
      type: 'string',
      description: 'User password',
      example: '**********'
    }
  } 
};

module.exports = { 
  User
};