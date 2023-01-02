import express from "express";
import { StatusCodes } from "http-status-codes";
import { loadModels } from "./utils/loadModelsUtil";
import { parseQueryParams } from "./utils/parseQueryParams";
import AdminJS from "adminjs";
import { Database, Resource } from "@adminjs/mongoose";
import { CreateAdminJS } from "./admin";
import cookieParser from "cookie-parser";
import { config } from "./config/config";
import swaggerUi from "swagger-ui-express";
import logger from "./middleware/logger";

import rateLimiter from "./middleware/rateLimiter";

import CorporateTraineeRouter from "./routes/CorporateTrainee";
import IndividualTraineeRouter from "./routes/IndividualTrainee";
import InstructorRouter from "./routes/Instructor";
import CourseRouter from "./routes/Course";
import LangRouter from "./routes/Currency";
import PromotionRouter from "./routes/Promotion";
import EnrollmentRouter from "./routes/Enrollment";
import AuthRouter from "./routes/Auth";
import MeRouter from "./routes/Me";
import PaymentRouter from "./routes/Payment";
import ReportThreadRouter from "./routes/ReportThread";

import { populateTestDb } from "./utils/populateTestDb";

const cors = require("cors");
import * as path from "path";

const app = express();

/* --- Create Server --- */
loadModels();

app.use(
    cors({
        origin: true,
        credentials: true
    })
);

app.use("/payment/stripe-webhook", express.raw({ type: "*/*" }));

app.use(cookieParser());
const swaggerFile = require("./swagger/swagger.json");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

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

app.use(logger);
app.use(rateLimiter());

/* --- Health Check --- */
app.get("/ping", (req, res) => {
    return res.status(StatusCodes.OK).json({ message: "pong" });
});
/* --- End Health Check --- */

/* --- Create AdminJS --- */
AdminJS.registerAdapter({ Database, Resource });
app.use(express.static(path.join(__dirname, "../public")));
CreateAdminJS(app);
/* --- End Create AdminJS --- */

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* Routers */
app.use("/courses", CourseRouter);
app.use("/instructors", InstructorRouter);
app.use("/corporate-trainees", CorporateTraineeRouter);
app.use("/individual-trainees", IndividualTraineeRouter);
app.use("/country", LangRouter);
app.use("/promotions", PromotionRouter);
app.use("/enrollments", EnrollmentRouter);
app.use("/auth", AuthRouter);
app.use("/me", MeRouter);
app.use("/payment", PaymentRouter);
app.use("/report-thread", ReportThreadRouter);

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
    return res.status(StatusCodes.NOT_FOUND).json({ message: "Not Found" });
});

// FIXME: should be removed in Test environment. This is for production only.
// getCurrencyRatesTask.start();
/* --- End Routes --- */

//NOTE: Use this to populate the database with test data
// for (let i = 0; i < 2; i++) {
//     populateTestDb();
// }

export default app;
