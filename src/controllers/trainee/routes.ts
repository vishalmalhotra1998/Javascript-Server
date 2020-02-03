import { Router } from 'express';
import traineeController from './Controller';

const routeHandler = Router();

routeHandler.get('/', traineeController.get);
routeHandler.post('/', traineeController.post);
routeHandler.put('/', traineeController.put);
routeHandler.delete('/', traineeController.delete);

export default routeHandler;