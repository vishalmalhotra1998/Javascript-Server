import { traineeRouteHandler } from './controllers/trainee/';
import routeHandler from './controllers/user/routes';
import { Router } from 'express';

const mainRoute = Router();
console.log('This---------------');
mainRoute.use('/trainee', traineeRouteHandler);
mainRoute.use('/user', routeHandler);
export default mainRoute;