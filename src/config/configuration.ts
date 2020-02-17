
import { config } from 'dotenv';
import IConfig from './IConfig';
config();
const configuration: IConfig = {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    SECRET_KEY: process.env.SECRET_KEY
};
Object.freeze(configuration);
export default configuration;
