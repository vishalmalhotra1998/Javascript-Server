import { Router } from 'express';
import UserController from './UserController';
import validationChecker from '../../libs/routes/validationHandler';
import validation from './validation';
import authMiddleware from '../../libs/routes/authMiddleWare';
import swaggerOptions from './../trainee/Swagger';
import * as swaggerUi from 'swagger-ui-express';


const routeHandler = Router();

routeHandler.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOptions));
/**
 * @swagger
 * /user/me:
 *  get:
 *    security:
 *     - Bearer: []
 *    responses:
 *             '200':
 *              description: 'Trainee Data retrived'
 *             '400':
 *              description: Bad request.
 *             '5XX':
 *              description: Unexpected error.
 */
routeHandler.get('/me', authMiddleware('getUsers', 'read'), validationChecker(validation.get), UserController.me);
/**
 * @swagger
 * /user/login:
 *  post:
 *     security:
 *      - Bearer: []
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: Email and Password.
 *         schema:
 *           type: object
 *           required:
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 * 
 *     responses:
 *             '200':
 *              description: 'Successfully Created'
 *             '400':
 *              description: Bad request.
 *             '5XX':
 *              description: Unexpected error.
 */

routeHandler.post('/login', UserController.login);

export default routeHandler;