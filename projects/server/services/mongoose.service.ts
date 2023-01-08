import mongoose, { ConnectOptions } from "mongoose";
import logger from "../services/logger.service";
import Config from "./config.service";
import Env from "./env.service";

mongoose.connection.on("error", (error) => {
  logger.error("MongoDB Error", error);
});

mongoose.connection.on("disconnected", () => {
  logger.error("MongoDB Disconnected");
});

const mongoDB = {
  connect: () => {
    if (!Env.isProd()) {
      mongoose.set("debug", true);
    }
    mongoose.set("strictQuery", true);
    mongoose
      .connect(Config.MONGODB_URL, {
        useNewUrlParser: true,
        dbName: Config.MONGODB_NAME,
      } as ConnectOptions)
      .then(() => {
        logger.debug("MongoDB connected");
      })
      .catch((err) => {
        logger.error("MongoDB connecting Error", err);
      });
  },
};

export default mongoDB;
