import { Router } from 'express';
import UserController from './UserController';
import validationChecker from '../../libs/routes/validationHandler';
import validation from './validation';
import authMiddleware from '../../libs/routes/authMiddleWare';
import SystemResponse from '../../libs/SystemResponse';
import IRequest from '../../libs/routes/IRequest';

const routeHandler = Router();

routeHandler.get('/', authMiddleware('getUsers', 'read'), validationChecker(validation.get), UserController.get);
routeHandler.post('/', authMiddleware('getUsers', 'read'), validationChecker(validation.create), UserController.post);
routeHandler.put('/', authMiddleware('getUsers', 'read'), validationChecker(validation.update), UserController.put);
routeHandler.delete('/:id', authMiddleware('getUsers', 'read'), validationChecker(validation.delete), UserController.delete);
routeHandler.get('/me', authMiddleware('getUsers', 'read'), validationChecker(validation.get), UserController.me);
routeHandler.post('/login', UserController.login);

export default routeHandler;