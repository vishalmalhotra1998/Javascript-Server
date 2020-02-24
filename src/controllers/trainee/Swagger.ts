import * as swaggerJsdoc from 'swagger-jsdoc';
const options = {
    apis: ['./dist/controllers/trainee/Swagger', './dist/controllers/trainee/routes.js'],
    basePath: '/',
    swaggerDefinition: {
        info: {
            description: 'Test API ',
            swagger: '2.0',
            openapi: '3.0.0',
            title: 'My API',
            version: '1.0.0',
        },
        servers: ['http://localhost:9000']
    },
};
const swaggerOptions = swaggerJsdoc(options);
export default swaggerOptions;