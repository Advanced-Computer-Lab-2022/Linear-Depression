import mongoose from "mongoose";
import { config } from "./config/config";
import app from "./server";
import { logInfo, logError, logSuccess } from "./middleware/logger";

/*connect to MongoDB*/
mongoose
    .connect(config.mongo.config, {
        retryWrites: true,
        w: "majority"
    })
    .then(() => {
        logSuccess("Connected to MongoDB");

        app.listen(config.server.port, () => {
            logInfo(`Server started at http://localhost:${config.server.port}`);
            console.log("---------------------------------------");
        });
    })
    .catch((err) => {
        logError(err);
    });
