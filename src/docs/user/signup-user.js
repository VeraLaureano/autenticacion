module.exports = {
  post: {
    tags: ['User Auth Operations'], 
    description: 'Signup User', 
    operationId: 'postSignupUser', 
    parameters: [], 
    requestBody: {
      content: {
        'application/json': {
          schema: {
            username: {
              type: 'string',
            },
            email: {
              type: 'string',
            },
            password: {
              type: 'string',
            },
            confirmPassword: {
              type: 'string',
            }
          },
          example: {
            username: 'nombre',
            email: 'ejemplo@correo.com',
            password: '**********',
            confirmPassword: '**********',
          }
        }
      }
    },
    responses: {
      201: {
        description: 'User signup successfully',
        content: {
          'application/json': {
            schema: {
              signup: { 
                type: 'boolean'
              },
              example: {
                signup: true
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
      409: {
        description: 'Conflict',
        content: {
          'application/json': {
            schema: {
              message: { 
                type: 'string'
              },
              example: {
                message: 'ALREADY_A_USER_WITH_THAT_EMAIL'
              }
            },
          },
        },
      },
    },
  }
};