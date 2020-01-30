
import * as express from 'express';
// Created a class Server
class Server {
    private app: express.Express;
    constructor(private config) {
        this.app = express();

    }

    // Bootstrap function is used for calling setupRoutes
    bootstrap = () => {
        this.setupRoutes();
        return this;
    }

    run = () => {
        const { app, config: { PORT: port }
        } = this;
        app.listen(port, (error) => {
            if (error) {
                throw (error);
            }
            console.log('App is running succesfully ' + port);
        });

    }

    setupRoutes = () => {
        const { app } = this;
        // Creating route for health-check
        app.use('/health-check', (req, res) => {

            res.send('I am Ok');
        });
        return this;
    }
}

export default Server;