import express from "express";
import Logger from "./library/Logger";
import AdminJS from "adminjs";
import { Database, Resource } from "@adminjs/mongoose";
import { CreateAdminJS } from "./admin";

const app = express();

/* --- Create Server --- */
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
/* --- End Create Server --- */

/* --- Create AdminJS --- */
AdminJS.registerAdapter({ Database, Resource });
CreateAdminJS(app);
/* --- End Create AdminJS --- */

/* --- Basic Routes --- */
// Health Check
app.get("/ping", (req, res) => {
    return res.status(200).json({ message: "pong" });
});
app.get("/test", async (_req, res) => {
    res.status(200).json({ message: "Hello World" });
});

// 404
app.use((req, res) => {
    const error = new Error("Not Found");
    Logger.error(error);
    return res.status(404).json({ message: error.message });
});
/* --- End Routes --- */

export default app;
