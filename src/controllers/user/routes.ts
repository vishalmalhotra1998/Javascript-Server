import { Router } from 'express';
import UserController from './UserController';
import validationChecker from '../../libs/routes/validationHandler';
import validation from './validation';
import authMiddleware from '../../libs/routes/authMiddleWare';
import swaggerOptions from './../../libs/routes/Swagger';
import * as swaggerUi from 'swagger-ui-express';


const routeHandler = Router();

routeHandler.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOptions));
/**
 * @swagger
 * /user/me:
 *  get:
 *    tags:
 *      - User
 *    security:
 *     - Bearer: []
 *    summary: User profile
 *    responses:
 *             '200':
 *              description: User Profile
 *              schema:
 *                type: object
 *                examples:
 *                properties:
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
 *              description: Unauthorized Access.
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    example: Unauthorised Access
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
 */
routeHandler.get('/me', authMiddleware('getUsers', 'read'), validationChecker(validation.get), UserController.me);
/**
 * @swagger
 * /user/login:
 *  post:
 *     tags:
 *       - User
 *     security:
 *      - Bearer: []
 *     summary: User Token
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
 *              description: 'Token Generated'
 *              schema:
 *                type: object
 *                examples:
 *                properties:
 *                    type: object
 *                    message:
 *                      type: string
 *                      example: Token Generated
 *                    Token:
 *                      type: string
 *                      example: eYsssjaicjweicmwicmckmci12233990njs_hcbsdhcbhcgyuknjcjkikskxhsn56jndcjckmckmxkxxjksxhnbvx
 *             '403':
 *              description: Unauthorized Access.
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    example: Unauthorised Access
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
 */

routeHandler.post('/login', UserController.login);

export default routeHandler;
