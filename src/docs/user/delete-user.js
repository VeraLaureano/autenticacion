module.exports = {
  delete: {
    tags: ['User Auth Operations'], 
    description: 'Deleting a User', 
    operationId: 'deleteUser', 
    parameters: [],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            confirmUsername: {
              type: 'string',
            },
            isSure: {
              type: 'boolean',
            }
          },
          example: {
            username: 'name',
            isSure: true
          }
        }
      }
    },
    responses: {
      204: {
        description: 'User deleted successfully',
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
                message: 'USERNAME_NOT_MATCH'
              }
            },
          },
        },
      },
    },
  }
};