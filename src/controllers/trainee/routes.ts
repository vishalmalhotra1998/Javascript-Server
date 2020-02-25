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
 * /:
 *  get:
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: query
 *         name: skip
 *         schema:
 *           type: number
 *         required: false
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *         required: false
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         required: false
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         required: false
 *     responses:
 *             '200':
 *              description: 'Trainee Data retrived'
 *             '400':
 *              description: Bad request.
 *             '401':
 *              description: Authorization information is missing or invalid.
 *             '404':
 *              description: A user with the specified ID was not found.
 *             '5XX':
 *              description: Unexpected error.
 *
 */

routeHandler.get('/', authMiddleware('getUsers', 'read'), validationChecker(validation.get), traineeController.get);
/**
 * @swagger
 * /:
 *  post:
 *     security:
 *      - Bearer: []
 *     summary: Creates a new user.
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: The user to create.
 *         schema:
 *           type: object
 *           required:
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             role:
 *               type: string
 *             password:
 *               type: string
 *             mob:
 *               type: number
 *             dob:
 *               type: string
 *             hobbies:
 *                  type: array
 *                  items:
 *                    type: string
 *             address:
 *               type: string
 *     responses:
 *             '200':
 *              description: 'Successfully Updated'
 *             '400':
 *              description: Bad request. User ID must be an integer and larger than 0.
 *             '401':
 *              description: Authorization information is missing or invalid.
 *             '404':
 *              description: A user with the specified ID was not found.
 *             '5XX':
 *              description: Unexpected error.
 *
 *
 */
routeHandler.post('/', authMiddleware('getUsers', 'read'), validationChecker(validation.create), traineeController.post);
/**
 * @swagger
 * /:
 *  put:
 *     security:
 *       - Bearer: []
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: Update Data
 *         description: Update the Data.
 *         schema:
 *           type: object
 *           required:
 *           properties:
 *             id:
 *               type: string
 *             dataToUpdate:
 *               type: object
 *     responses:
 *        '200':
 *          description: 'Successfully Updated'
 *        '400':
 *         description: Bad request. User ID must be an integer and larger than 0.
 *        '401':
 *         description: Authorization information is missing or invalid.
 *        '404':
 *         description: A user with the specified ID was not found.
 *        '5XX':
 *         description: Unexpected error.
 *
 *
 */
routeHandler.put('/', authMiddleware('getUsers', 'write'), validationChecker(validation.update), traineeController.put);
/**
 * @swagger
 * /{id}:
 *  delete:
 *      parameters:
 *       - in: params
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *      security:
 *       - Bearer: []
 *      responses:
 *        '200':
 *          description: 'Successfully Updated'
 *        '400':
 *         description: Bad request. User ID must be an integer and larger than 0.
 *        '401':
 *         description: Authorization information is missing or invalid.
 *        '404':
 *         description: A user with the specified ID was not found.
 *        '5XX':
 *         description: Unexpected error.
 *
 *
 */
routeHandler.delete('/:id', authMiddleware('getUsers', 'delete'), validationChecker(validation.delete), traineeController.delete);

export default routeHandler;