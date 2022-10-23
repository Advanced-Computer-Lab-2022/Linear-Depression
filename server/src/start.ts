import mongoose from "mongoose";
import Logger from "./library/Logger";
import { config } from "./config/config";
const app = require("./server");

/*connect to MongoDB*/
mongoose
    .connect(config.mongo.config, {
        retryWrites: true,
        w: "majority"
    })
    .then(() => {
        Logger.log("Connected to MongoDB");

        app.listen(config.server.port, () => {
            Logger.log(`Server started at port ${config.server.port}`);
        });
    })
    .catch((err) => {
        Logger.log(err);
    });
