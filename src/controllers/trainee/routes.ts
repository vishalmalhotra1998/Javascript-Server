import { Router } from 'express';
import traineeController from './Controller';
import validationChecker from '../../libs/routes/validationHandler';
import validation from './validation';
import authMiddleware from '../../libs/routes/authMiddleWare';
import swaggerOptions from './../../libs/routes/Swagger';
import * as swaggerUi from 'swagger-ui-express';

const routeHandler = Router();

routeHandler.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOptions));

// Routes
/**
 * @swagger
 * /trainee:
 *   get:
 *     tags:
 *       - Trainee
 *     security:
 *       - Bearer: []
 *     summary: Get all Details of Users
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
 *              description: 'Trainee Data Retrieved'
 *              schema:
 *                type: object
 *                examples:
 *                properties:
 *                   status:
 *                     type: string
 *                     example: ok
 *                   message:
 *                    type: string
 *                    example: Trainee Data Retrieved
 *                   Count:
 *                     type: number
 *                     example: 3
 *                   data:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        _id:
 *                          type: string
 *                          example: 5e57cd95fec2ce0565f543cb
 *                        name:
 *                          type: string
 *                          example: Abhay rajput
 *                        email:
 *                          type: string
 *                          example: trainee@successive.tech
 *                        role:
 *                          type: string
 *                          example: trainee
 *                        password:
 *                          type: string
 *                          example: $2b$10$wAyRH8tJrVpcoh4SnkT3EOa1WsNW/33yGXLYqzWk1dL4YqdgMKaQ2
 *                        mob:
 *                          type: number
 *                          example: 7686644688
 *                        dob:
 *                          type: string
 *                          format: date
 *                          example: 1992-12-02
 *                        hobbies:
 *                          type: array
 *                          items:
 *                            type: string
 *                            example: guitar
 *                        address:
 *                             type: string
 *                             example: Noida
 *                        createdBy:
 *                              type: string
 *                              example: 5e577abc417c5b3a22164a8c
 *                        originalId:
 *                               type: string
 *                               example: 5e57cd95fec2ce0565f543cb
 *                        createdAt:
 *                               type: string
 *                               format: date
 *                               example: 2020-02-27T14:09:25.128Z
 *             '403':
 *              description: Unauthorized Access.
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    example: Unauthorized Access
 *                  message:
 *                    example: jwt must be provided
 *                  status:
 *                    example: 403
 *                  timestamp:
 *                    example: 2019-03-10T19:51:37.066Z
 *             '404':
 *              description: Not Found.
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    example: Not Found
 *                  message:
 *                    example: Error
 *                  status:
 *                    example: 500
 *                  timestamp:
 *                    example: 2019-03-10T19:51:37.066Z
 *
 */

routeHandler.get('/', authMiddleware('getUsers', 'read'), validationChecker(validation.get), traineeController.list);
/**
 * @swagger
 * /trainee:
 *  post:
 *     tags:
 *       - Trainee
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
 *              description: Trainee Data Created
 *              schema:
 *                type: object
 *                examples:
 *                properties:
 *                    status:
 *                      type: string
 *                      example: ok
 *                    message:
 *                      type: string
 *                      example: Trainee Data Created
 *                    type: object
 *                    data:
 *                      type: object
 *                      properties:
 *                        _id:
 *                          type: string
 *                          example: 5e57cd95fec2ce0565f543cb
 *                        name:
 *                          type: string
 *                          example: Abhay rajput
 *                        email:
 *                          type: string
 *                          example: trainee@successive.tech
 *                        role:
 *                          type: string
 *                          example: trainee
 *                        password:
 *                          type: string
 *                          example: $2b$10$wAyRH8tJrVpcoh4SnkT3EOa1WsNW/33yGXLYqzWk1dL4YqdgMKaQ2
 *                        mob:
 *                          type: number
 *                          example: 7686644688
 *                        dob:
 *                          type: string
 *                          format: date
 *                          example: 1992-12-02
 *                        hobbies:
 *                          type: array
 *                          items:
 *                            type: string
 *                            example: guitar
 *                        address:
 *                             type: string
 *                             example: Noida
 *                        createdBy:
 *                              type: string
 *                              example: 5e577abc417c5b3a22164a8c
 *                        originalId:
 *                               type: string
 *                               example: 5e57cd95fec2ce0565f543cb
 *                        createdAt:
 *                               type: string
 *                               format: date
 *                               example: 2020-02-27T14:09:25.128Z
 *             '403':
 *              description: Unauthorized Access
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    example: Unauthorized Access
 *                  message:
 *                    example: jwt must be provided
 *                  status:
 *                    example: 403
 *                  timestamp:
 *                    example: 2019-03-10T19:51:37.066Z
 *             '404':
 *              description: Not Found.
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    example: Not Found
 *                  message:
 *                    example: Error
 *                  status:
 *                    example: 500
 *                  timestamp:
 *                    example: 2019-03-10T19:51:37.066Z
 *
 *
 */
routeHandler.post('/', authMiddleware('getUsers', 'read'), validationChecker(validation.create), traineeController.post);
/**
 * @swagger
 * /trainee:
 *    put:
 *     tags:
 *       - Trainee
 *     summary: Update the User Data
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
 *           examples:
 *           properties:
 *             id:
 *               type: string
 *             dataToUpdate:
 *               type: object
 *               properties:
 *                name:
 *                  type: string
 *                email:
 *                   type: string
 *                role:
 *                  type: string
 *                password:
 *                   type: string
 *                mob:
 *                 type: number
 *                dob:
 *                  type: string
 *                hobbies:
 *                   type: array
 *                   items:
 *                     type: string
 *                address:
 *                  type: string
 *
 *     responses:
 *             '200':
 *              description: Trainee Data Updated
 *              schema:
 *                type: object
 *                examples:
 *                properties:
 *                    status:
 *                      type: string
 *                      example: ok
 *                    message:
 *                      type: string
 *                      example: Trainee Data Updated
 *                    type: object
 *                    data:
 *                      type: object
 *                      properties:
 *                        _id:
 *                          type: string
 *                          example: 5e57cd95fec2ce0565f543cb
 *                        name:
 *                          type: string
 *                          example: Abhay rajput
 *                        email:
 *                          type: string
 *                          example: trainee@successive.tech
 *                        role:
 *                          type: string
 *                          example: trainee
 *                        password:
 *                          type: string
 *                          example: $2b$10$wAyRH8tJrVpcoh4SnkT3EOa1WsNW/33yGXLYqzWk1dL4YqdgMKaQ2
 *                        mob:
 *                          type: number
 *                          example: 7686644688
 *                        dob:
 *                          type: string
 *                          format: date
 *                          example: 1992-12-02
 *                        hobbies:
 *                          type: array
 *                          items:
 *                            type: string
 *                            example: guitar
 *                        address:
 *                             type: string
 *                             example: Noida
 *                        createdBy:
 *                              type: string
 *                              example: 5e577abc417c5b3a22164a8c
 *                        originalId:
 *                               type: string
 *                               example: 5e57cd95fec2ce0565f543cb
 *                        createdAt:
 *                               type: string
 *                               format: date
 *                               example: 2020-02-27T14:09:25.128Z
 *                        updatedAt:
 *                              type: string
 *                              format: date
 *                              example: 2020-02-27T14:09:25.128Z
 *                        updatedBy:
 *                              type: string
 *                              example: 5e57cd95fec2ce0565f543cb
 *             '403':
 *              description: Unauthorized Access.
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    example: Unauthorized Access
 *                  message:
 *                    example: jwt must be provided
 *                  status:
 *                    example: 403
 *                  timestamp:
 *                    example: 2019-03-10T19:51:37.066Z
 *             '404':
 *              description: Not Found.
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    example: Not Found
 *                  message:
 *                    example: Error
 *                  status:
 *                    example: 500
 *                  timestamp:
 *                    example: 2019-03-10T19:51:37.066Z
 *
 *
 */
routeHandler.put('/', authMiddleware('getUsers', 'read'), validationChecker(validation.update), traineeController.put);
/**
 * @swagger
 *  /trainee/{id}:
 *   delete:
 *      tags:
 *         - Trainee
 *      summary: Deletes a user.
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *      security:
 *       - Bearer: []
 *      responses:
 *             '200':
 *              description: Trainee Data Deleted
 *              schema:
 *                type: object
 *                examples:
 *                properties:
 *                    status:
 *                      type: string
 *                      example: ok
 *                    message:
 *                      type: string
 *                      example: Trainee Data Deleted
 *                    type: object
 *                    data:
 *                      type: object
 *                      properties:
 *                        _id:
 *                          type: string
 *                          example: 5e57cd95fec2ce0565f543cb
 *                        name:
 *                          type: string
 *                          example: Abhay rajput
 *                        email:
 *                          type: string
 *                          example: trainee@successive.tech
 *                        role:
 *                          type: string
 *                          example: trainee
 *                        password:
 *                          type: string
 *                          example: $2b$10$wAyRH8tJrVpcoh4SnkT3EOa1WsNW/33yGXLYqzWk1dL4YqdgMKaQ2
 *                        mob:
 *                          type: number
 *                          example: 7686644688
 *                        dob:
 *                          type: string
 *                          format: date
 *                          example: 1992-12-02
 *                        hobbies:
 *                          type: array
 *                          items:
 *                            type: string
 *                            example: guitar
 *                        address:
 *                             type: string
 *                             example: Noida
 *                        createdBy:
 *                              type: string
 *                              example: 5e577abc417c5b3a22164a8c
 *                        originalId:
 *                               type: string
 *                               example: 5e57cd95fec2ce0565f543cb
 *                        createdAt:
 *                               type: string
 *                               format: date
 *                               example: 2020-02-27T14:09:25.128Z
 *                        deletedAt:
 *                              type: string
 *                              format: date
 *                              example: 2020-02-27T14:09:25.128Z
 *                        deletedBy:
 *                              type: string
 *                              example: 5e57cd95fec2ce0565f543cb
 *             '403':
 *              description: Unauthorized Access.
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    example: Unauthorized Access
 *                  message:
 *                    example: jwt must be provided
 *                  status:
 *                    example: 403
 *                  timestamp:
 *                    example: 2019-03-10T19:51:37.066Z
 *             '404':
 *              description: Not Found.
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    example: Not Found
 *                  message:
 *                    example: Error
 *                  status:
 *                    example: 500
 *                  timestamp:
 *                    example: 2019-03-10T19:51:37.066Z
 *
 *
 */
routeHandler.delete('/:id', authMiddleware('getUsers', 'delete'), validationChecker(validation.delete), traineeController.delete);

export default routeHandler;
