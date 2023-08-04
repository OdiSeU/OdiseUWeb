import winston from "winston";
import winstonDaily from "winston-daily-rotate-file";
import path from "path";
import Env from "./env.service";

const logDir = path.join(__dirname, `../logs/${Env.mode}`);

const logFormat = winston.format.printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}] : ${message}`;
});

const format = winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    logFormat
);

const httpDaily = new winstonDaily({
    level: "http",
    datePattern: "YYYY-MM-DD",
    dirname: logDir,
    filename: `%DATE%.log`,
    maxFiles: 30,
    zippedArchive: true,
});

const errorDaily = new winstonDaily({
    level: "error",
    datePattern: "YYYY-MM-DD",
    dirname: logDir + "/error",
    filename: `%DATE%.error.log`,
    maxFiles: 30,
    zippedArchive: true,
});

// uncaughtException 발생
const exceptionDaily = new winstonDaily({
    level: "error",
    datePattern: "YYYY-MM-DD",
    dirname: logDir + "/exception",
    filename: `%DATE%.exception.log`,
    maxFiles: 30,
    zippedArchive: true,
});

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const Logger = winston.createLogger({
    format: format,
    transports: [httpDaily, errorDaily],
    exceptionHandlers: [exceptionDaily],
});

if (!Env.isProd()) {
    Logger.add(
        new winston.transports.Console({
            level: "silly",
            format: winston.format.colorize(),
        })
    );
}

export default Logger;
