import { Router } from 'express';
import traineeController from './Controller';
import validationChecker from '../../libs/routes/validationHandler';
import validation from './validation';
import authMiddleware from '../../libs/routes/authMiddleWare';
import swaggerOptions from './Swagger';
import * as swaggerUi from 'swagger-ui-express';

const routeHandler = Router();

routeHandler.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOptions));

// Routes
/**
 * @swagger
 * /api/trainee/:
 *  get:
 *     parameters:
 *       - in: query
 *         name: skip
 *         schema:
 *           type: number
 *         required: true
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *         required: true
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         required: true
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         required: true
 *     security:
 *       - bearerAuth: []
 *     responses:
 *      '200':
 *        description: A successful Response
 *
 */

routeHandler.get('/', traineeController.get);
/**
 * @swagger
 * /api/trainee/:
 *  post:
 *      parameters:
 *       - in: body
 *         name: Body
 *         schema:
 *           type: object
 *         required: true
 *      security:
 *       - bearerAuth: []
 *      responses:
 *       '200':
 *         description: A successful Response
 *
 */
routeHandler.post('/', authMiddleware('getUsers', 'read'), validationChecker(validation.create), traineeController.post);
/**
 * @swagger
 * /api/trainee/:
 *  put:
 *      security:
 *       - bearerAuth: [ ]
 *      parameters:
 *       - in: body
 *         name: Body
 *         schema:
 *           type: object
 *         required: true
 *      responses:
 *        '200':
 *          description: 'Will send `Authenticated`'
 *
 */
routeHandler.put('/', traineeController.put);
/**
 * @swagger
 * /api/trainee/:id:
 *  delete:
 *      parameters:
 *       - in: params
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *      components:
 *       securitySchemes:
 *         bearerAuth:
 *           type: http
 *           scheme: bearer
 *           bearerFormat: JWT
 *      security:
 *       - bearerAuth: []
 *      responses:
 *       '200':
 *         description: A successful Response
 *
 *
 */
routeHandler.delete('/:id', authMiddleware('getUsers', 'delete'), validationChecker(validation.delete), traineeController.delete);

export default routeHandler;