import { Router } from 'express';
import traineeController from './Controller';
import validationChecker from '../../libs/routes/validationHandler';
import validation from './validation';
import authMiddleware from '../../libs/routes/authMiddleWare';

const routeHandler = Router();

routeHandler.get('/', authMiddleware('getUsers', 'read'), validationChecker(validation.get), traineeController.get);
routeHandler.post('/', validationChecker(validation.create), traineeController.post);
routeHandler.put('/', validationChecker(validation.update), traineeController.put);
routeHandler.delete('/:id', validationChecker(validation.delete), traineeController.delete);

export default routeHandler;