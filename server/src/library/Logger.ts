import chalk from "chalk";

export default class Logger {
    public static log = (args: any) => {
        this.info(args);
    };
    public static info = (args: any) => {
        console.log(
            chalk.blue(`[${new Date().toLocaleString()}] [INFO]`),
            typeof args === "string" ? chalk.blueBright(args) : chalk.blueBright(JSON.stringify(args))
        );
    };
    public static warn = (args: any) => {
        console.log(
            chalk.blue(`[${new Date().toLocaleString()}] [Warning]`),
            typeof args === "string" ? chalk.yellowBright(args) : chalk.yellowBright(JSON.stringify(args))
        );
    };
    public static error = (args: any) => {
        console.log(
            chalk.red(`[${new Date().toLocaleString()}] [ERROR]`),
            typeof args === "string" ? chalk.redBright(args) : chalk.redBright(JSON.stringify(args))
        );
    };
}
