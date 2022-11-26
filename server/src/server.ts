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
import swaggerUi from "swagger-ui-express";

import CorporateTraineeRouter from "./routes/CorporateTrainee";
import IndividualTraineeRouter from "./routes/IndividualTrainee";
import InstructorRouter from "./routes/Instructor";
import CourseRouter from "./routes/Course";
import LangRouter from "./routes/Currency";
import PromotionRouter from "./routes/Promotion";
import ExerciseRouter from "./routes/Exercise";
import getCurrencyRatesTask from "./tasks/cacheCurrencyRates";

const cors = require("cors");
import * as path from "path";
import axios from "axios";

const app = express();

/* --- Create Server --- */
loadModels();

app.use(
    cors({
        origin: true,
        credentials: true
    })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
const swaggerFile = require("./swagger.json");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

/* --- End Create Server --- */
let defaultCountry = "unknown";
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

    if (defaultCountry == "unknown") {
        axios
            .get("https://ipapi.co/json/")
            .then((response) => {
                defaultCountry = response.data.country_name;
            })
            .catch((error) => {
                console.log(error);
            });
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
app.use("/courses/:courseId/lessons/:lessonId", ExerciseRouter);

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

getCurrencyRatesTask.start();
/* --- End Routes --- */

export default app;
