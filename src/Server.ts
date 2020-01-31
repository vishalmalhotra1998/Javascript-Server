
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Request } from 'express';
import { Response } from 'express';
import errorHandler from './libs/routes/errorHandler';
import notFoundRoute from './libs/routes/notFoundRoute';

interface IUser {
    id: string;
    name: string;

}
interface INewRequestUser extends Request {
    user: IUser;
}

// Created a class Server
class Server {
    private app: express.Express;
    constructor(private config) {
        this.app = express();

    }

    // Bootstrap function is used for calling setupRoutes and initBodyParser
    bootstrap = () => {
        this.setupRoutes();
        this.initBodyParser();
        return this;
    }

    initBodyParser = () => {
        const { app } = this;
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());

    }
    run = () => {
        const { app, config: { PORT: port }
        } = this;
        app.listen(port, error => {
            if (error) {
                throw (error);
            }
            console.log('App is running succesfully at port number: ' + port);
        });
    }

    setupRoutes = () => {
        const { app } = this;
        // Creating route for health-check
        app.get('/health-check', (req: Request, res: Response) => {

            res.send('I am OK');

        });
        // Creating route for api
        app.use('/api', (req: INewRequestUser, res, next) => {

            req.user = {
                id: '1',
                name: 'Node'
            };
            res.send('Ok');
        });

        app.use(notFoundRoute);
        app.use(errorHandler);
        return this;
    }
}

export default Server;