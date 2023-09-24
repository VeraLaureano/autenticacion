module.exports = {
  post: {
    tags: ['User Auth Operations'], 
    description: 'Login User', 
    operationId: 'postLoginUser', 
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
      200: {
        description: 'User login successfully',
        content: {
          'application/json': {
            schema: {
              token: { 
                type: 'string'
              },
              example: {
                token: ''
              }
            },
          },
        },
      },
      401: {
        description: 'Unauthorized',
        content: {
          'application/json': {
            schema: {
              message: { 
                type: 'string'
              },
              example: {
                message: 'INVALID_CREDENTIALS'
              }
            },
          },
        },
      },
    },
  }
};