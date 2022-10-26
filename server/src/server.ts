import express from "express";
import { StatusCodes } from "http-status-codes";
import Logger from "./library/Logger";
import courseRouter from "./routes/Course";
import instructorRouter from "./routes/Instructor";
import { loadModels } from "./utils/loadModelsUtil";
import { parseQueryParams } from "./utils/parseQueryParams";
import AdminJS from "adminjs";
import { Database, Resource } from "@adminjs/mongoose";
import { CreateAdminJS } from "./admin";
import CorporateTraineeRouter from "./routes/CorporateTrainee";
import IndividualTraineeRouter from "./routes/IndividualTrainee";
import LangRouter from "./routes/Currency";
import cookieParser from "cookie-parser";
import { instructorFactory } from "./tests/test_models/instructor/factory";
import Instructor from "./models/Instructor";
import { courseFactory } from "./tests/test_models/course/factory";
import Course from "./models/Course";
const cors = require("cors");

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
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
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
app.use("/courses", courseRouter);
app.use("/instructors", instructorRouter);
app.use("/corporate-trainees", CorporateTraineeRouter);
app.use("/individual-trainees", IndividualTraineeRouter);
app.use("/country", LangRouter);

/*Health Check*/
app.get("/ping", (req, res) => {
    return res.status(StatusCodes.OK).json({ message: "pong" });
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/*Health Check*/

/* --- Create AdminJS --- */
AdminJS.registerAdapter({ Database, Resource });
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

const instructorData = instructorFactory();
const instructor = new Instructor(instructorData);
instructor.save();
const courseData = courseFactory();
courseData.instructor = instructor._id;
const course = new Course(courseData);
course.save();

export default app;
