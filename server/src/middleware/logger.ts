import chalk from "chalk";
import { Request, Response, NextFunction } from "express";

const logInfo = (args: any) => {
    console.log(
        chalk.blue(`[${new Date().toLocaleTimeString()}] [INFO]`),
        typeof args === "string" ? chalk.blueBright(args) : chalk.blueBright(JSON.stringify(args))
    );
};

const logSuccess = (args: any) => {
    console.log(
        chalk.greenBright(`[${new Date().toLocaleTimeString()}] [Success]`),
        typeof args === "string" ? chalk.greenBright(args) : chalk.greenBright(JSON.stringify(args))
    );
};

const logError = (args: any) => {
    console.log(
        chalk.red(`[${new Date().toLocaleTimeString()}] [ERROR]`),
        typeof args === "string" ? chalk.redBright(args) : chalk.redBright(JSON.stringify(args))
    );
};

const logger = (req: Request, res: Response, next: NextFunction) => {
    logInfo(`${req.method} ${req.path}`);
    res.on("finish", () => {
        if (res.statusCode >= 400) {
            logError(`${res.statusCode} ${res.statusMessage}`);
        } else {
            logSuccess(`${res.statusCode} ${res.statusMessage}`);
        }
        console.log("---------------------------------------");
    });
    next();
};

export { logInfo, logSuccess, logError };

export default logger;
