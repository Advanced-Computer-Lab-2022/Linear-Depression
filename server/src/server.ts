import express from "express";
import mongoose from "mongoose";
import Logger from "./library/Logger";
import { config } from "./config/config";
import courseRouter from "./routes/Course";
import { loadModels } from "./utils/loadModelsUtil";

const app = express();

/*connect to MongoDB*/
mongoose
    .connect(config.mongo.config, {
        retryWrites: true,
        w: "majority"
    })
    .then(() => {
        Logger.log("Connected to MongoDB");
        startServer();
    })
    .catch((err) => {
        Logger.log(err);
    });

/*create server*/
const startServer = () => {
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
            return res.status(200).json({});
        }

        next();
    });

    /* Routers*/
    app.use("/courses", courseRouter);

    /*Health Check*/
    app.get("/ping", (req, res) => {
        return res.status(200).json({ message: "pong" });
    });

    /*404*/
    app.use((req, res) => {
        const error = new Error("Not Found");
        Logger.error(error);
        return res.status(404).json({ message: error.message });
    });

    app.listen(config.server.port, () => {
        Logger.log(`Server started at port ${config.server.port}`);
    });
};
