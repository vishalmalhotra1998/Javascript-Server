import { traineeRouteHandler } from './controllers/trainee/';
import { Router } from 'express';

const mainRoute = Router();
mainRoute.use('/trainee', traineeRouteHandler);
export default mainRoute;