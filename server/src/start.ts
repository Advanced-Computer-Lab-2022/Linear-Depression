import mongoose from "mongoose";
import Logger from "./library/Logger";
import { config } from "./config/config";
import app from "./server";

/*connect to MongoDB*/
mongoose
    .connect(config.mongo.config, {
        retryWrites: true,
        w: "majority"
    })
    .then(() => {
        Logger.log("Connected to MongoDB");

        app.listen(config.server.port, () => {
            Logger.log(`Server started at http://localhost:${config.server.port}`);
        });
    })
    .catch((err) => {
        Logger.error(err);
    });
