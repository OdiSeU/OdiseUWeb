import { IncomingMessage, ServerResponse } from 'http';
import morgan from 'morgan';
import Env from './env.service';
import Logger from './logger.service';

const format = () => {
    if(Env.isProd()) return ':method :url :status :response-time ms';
    return ':method :url :status :response-time ms';
}

const stream = {
    write: (message: string) => {
        Logger.http(message);
    }
}

const skip = (request: IncomingMessage, response: ServerResponse<IncomingMessage>): boolean => {
    return false;
}

const Morgan = morgan(format(), { stream, skip });

export default Morgan;