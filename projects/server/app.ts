import express, { urlencoded, json } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import Config from './services/config.service';
import Env from './services/env.service';

const app = express();

// for link react client app
const clientPath = path.join(path.resolve(), '../front/build');
app.use(express.static(clientPath));

// for read request.body
app.use(urlencoded({extended: true}));
app.use(cookieParser());
app.use(json());

// middleware
app.use((requset, response, next) => {
    console.log(`[${requset.method}] ${requset.path}`);
    next();
});

// start server
app.listen(Config.SERVER_PORT, ()=> {
    console.log(`> Server on ${Config.SERVER_HOST}:${Config.SERVER_PORT}`);
    console.log(`> ${Env.mode.toUpperCase()} MODE`);
});