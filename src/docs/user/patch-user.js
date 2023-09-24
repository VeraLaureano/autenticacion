module.exports = {
  patch: {
    tags: ['User Auth Operations'], 
    description: 'Update a username or password', 
    operationId: 'patchUser', 
    parameters: [],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            username: {
              type: 'string',
            },
            password: {
              type: 'string',
            },
            confirmPassword: {
              type: 'string',
            },
          },
          example: {
            username: 'onlyNewUsername',
            password: '***********',
            confirmPassword: '***********'
          }
        }
      }
    },
    responses: {
      201: {
        description: 'User update successfully',
        content: {
          'application/json': {
            schema: {
              delete: {
                type: 'boolean'
              },
              example: {
                delete: true
              }
            },
          },
        }, 
      },
      400: {
        description: 'Bad request',
        content: {
          'application/json': {
            schema: {
              message: { 
                type: 'string'
              },
              example: {
                message: 'PASSWORD_NOT_MATCH'
              }
            },
          },
        },
      },
      500: {
        description: 'Internal Server Error',
        content: {
          'application/json': {
            schema: {
              message: { 
                type: 'string'
              },
              example: {
                message: 'USER_NOT_FOUND'
              }
            },
          },
        },
      },
    },
  }
};