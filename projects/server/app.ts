import express, { urlencoded, json } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import Config from "./services/config.service";
import Env from "./services/env.service";
import Logger from "./services/logger.service";
import Morgan from "./services/morgan.service";
import mongoDB from "./services/mongoose.service";

const app = express();
mongoDB.connect();

// for link react client app
const clientPath = path.join(path.resolve(), "../front/build");
app.use(express.static(clientPath));

// for read request.body
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(json());

// middleware
app.use(Morgan);

// start server
app.listen(Config.SERVER_PORT, () => {
  Logger.debug(`> Server on ${Config.SERVER_HOST}:${Config.SERVER_PORT}`);
  Logger.debug(`> ${Env.mode.toUpperCase()} MODE`);
});
