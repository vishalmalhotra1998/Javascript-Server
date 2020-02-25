import * as swaggerJsdoc from 'swagger-jsdoc';
const options = {
    apis: ['dist/src/**/*.js', './dist/controllers/trainee/Swagger.js', './dist/controllers/trainee/routes.js'],
    swaggerDefinition: {
        basePath: '/api/trainee',
        info: {
            description: 'Test Trainee API ',
            swagger: '2.0',
            openapi: '3.0.1',
            title: 'My Trainee API',
            version: '1.0.0',
        },
        securityDefinitions: {
            Bearer: {
              in: 'Headers',
              name: 'Authorization',
              type: 'apiKey',
            }
          },
        servers: ['http://localhost:9000'],
    }
};
const swaggerOptions = swaggerJsdoc(options);
export default swaggerOptions;