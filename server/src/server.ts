import express from "express";
import { StatusCodes } from "http-status-codes";
import Logger from "./library/Logger";
import courseRouter from "./routes/Course";
import instructorRouter from "./routes/Instructor";
import { loadModels } from "./utils/loadModelsUtil";
import { parseQueryParams } from "./utils/parseQueryParams";

const app = express();

/* Create Server */
loadModels();
app.use((req, res, next) => {
    /* log the request */
    Logger.info(`Incoming -> Method [${req.method}] - URL [${req.url}] - IP [${req.socket.remoteAddress}]`);

    res.on("finish", () => {
        /* log the response */
        Logger.info(
            `Outgoing -> Status [${res.statusCode}] - Method [${req.method}] - URL [${req.url}] - IP [${req.socket.remoteAddress}]`
        );
    });

    next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/** Rules of our API */
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if (req.method == "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(StatusCodes.OK).json({});
    }

    next();
});

app.use((req, res, next) => {
    parseQueryParams(req, res, next);
});

/* Routers*/
app.use("/courses", courseRouter);
app.use("/instructors", instructorRouter);

/*Health Check*/
app.get("/ping", (req, res) => {
    return res.status(StatusCodes.OK).json({ message: "pong" });
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/*Health Check*/
app.get("/ping", (req, res) => {
    return res.status(StatusCodes.OK).json({ message: "pong" });
});
app.get("/test", async (_req, res) => {
    res.status(StatusCodes.OK).json({ message: "Hello World" });
});

/*404*/
app.use((req, res) => {
    const error = new Error("Not Found");
    Logger.error(error);
    return res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
});

export default app;
