import { Router } from 'express';
import UserController from './UserController';
import validationChecker from '../../libs/routes/validationHandler';
import validation from './validation';
import authMiddleware from '../../libs/routes/authMiddleWare';

const routeHandler = Router();

routeHandler.get('/', authMiddleware('getUsers', 'read'), validationChecker(validation.get), UserController.get);
routeHandler.post('/', authMiddleware('getUsers', 'write'), validationChecker(validation.create), UserController.post);
routeHandler.put('/', authMiddleware('getUsers', 'write'), validationChecker(validation.update), UserController.put);
routeHandler.delete('/:id', authMiddleware('getUsers', 'delete'), validationChecker(validation.delete), UserController.delete);

export default routeHandler;