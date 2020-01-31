import { Router } from 'express';
import { TraineeController } from './index';

const routHandler = Router();

routHandler.get('/', TraineeController.create);
routHandler.post('/', TraineeController.post);
routHandler.put('/', TraineeController.put);
routHandler.delete('/', TraineeController.delete);

export default routHandler;