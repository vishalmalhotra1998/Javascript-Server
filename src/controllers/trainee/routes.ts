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
 *     responses:
 *      '200':
 *        description: A successful Response
 *
 */

routeHandler.get('/', traineeController.get);
/**
 * @swagger
 * /api/trainee/my{skip,limit}:
 *  post:
 *    description: user to Request all Customer
 *    responses:
 *      '200':
 *        description: A successful Response
 *
 */
console.log('CheckThis');
routeHandler.post('/my', traineeController.post);
routeHandler.post('/', authMiddleware('getUsers', 'read'), validationChecker(validation.create), traineeController.post);
/**
 * @swagger
 * /:
 *  put:
 *    description: user to Request all Customer
 *    responses:
 *      '200':
 *        description: A successful Response
 *
 */
routeHandler.put('/', traineeController.put);
/**
 * @swagger
 * /:
 *  delete:
 *    description: user to Request all Customer
 *    responses:
 *      '200':
 *        description: A successful Response
 *
 */
routeHandler.delete('/:id', authMiddleware('getUsers', 'delete'), validationChecker(validation.delete), traineeController.delete);

export default routeHandler;