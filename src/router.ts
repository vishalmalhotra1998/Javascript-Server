import { traineeRouteHandler } from './controllers/trainee/';
import userRouteHandler from './controllers/user/routes';
import { Router } from 'express';

const mainRoute = Router();
mainRoute.use('/trainee', traineeRouteHandler);
mainRoute.use('/user', userRouteHandler);
export default mainRoute;