import express from "express";
import { StatusCodes } from "http-status-codes";
import Logger from "./library/Logger";
import { loadModels } from "./utils/loadModelsUtil";
import { parseQueryParams } from "./utils/parseQueryParams";
import AdminJS from "adminjs";
import { Database, Resource } from "@adminjs/mongoose";
import { CreateAdminJS } from "./admin";
import cookieParser from "cookie-parser";
import { config } from "./config/config";

import CorporateTraineeRouter from "./routes/CorporateTrainee";
import IndividualTraineeRouter from "./routes/IndividualTrainee";
import InstructorRouter from "./routes/Instructor";
import CourseRouter from "./routes/Course";
import LangRouter from "./routes/Currency";
import PromotionRouter from "./routes/Promotion";

const cors = require("cors");
import * as path from "path";

const app = express();

/* --- Create Server --- */
loadModels();

app.use((req, res, next) => {
    /* log the request */
    Logger.info(`Incoming -> Method [${req.method}] - URL [${req.url}] - IP [${req.socket.remoteAddress}]`);
    res.on("finish", () => {
        /* log the response */
        Logger.info(
            `Outgoing -> Status [${res.statusCode}] - Method [${req.method}] - URL [${req.url}] - IP [${req.socket.remoteAddress}]`
        );
        const cookies = req.cookies;
        Logger.info(`Cookies -> ${JSON.stringify(cookies)}`);
    });

    next();
});
app.use(
    cors({
        origin: true,
        credentials: true
    })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

/* --- End Create Server --- */

/** Rules of our API */
app.use((req, res, next) => {
    // Website you wish to allow to connect, localhost:3001 is the frontend
    res.setHeader("Access-Control-Allow-Origin", config.FRONT_END_URL);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");

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
app.use("/courses", CourseRouter);
app.use("/instructors", InstructorRouter);
app.use("/corporate-trainees", CorporateTraineeRouter);
app.use("/individual-trainees", IndividualTraineeRouter);
app.use("/country", LangRouter);
app.use("/promotions", PromotionRouter);

/*Health Check*/
app.get("/ping", (req, res) => {
    return res.status(StatusCodes.OK).json({ message: "pong" });
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/*Health Check*/

/* --- Create AdminJS --- */
AdminJS.registerAdapter({ Database, Resource });
app.use(express.static(path.join(__dirname, "../public")));
CreateAdminJS(app);
/* --- End Create AdminJS --- */

/* --- Basic Routes --- */
// Health Check
app.get("/ping", (req, res) => {
    return res.status(StatusCodes.OK).json({ message: "pong" });
});
app.get("/test", async (_req, res) => {
    res.status(StatusCodes.OK).json({ message: "Hello World" });
});

// 404
app.use((req, res) => {
    const error = new Error("Not Found");
    Logger.error(error);
    return res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
});

/* --- End Routes --- */

export default app;
