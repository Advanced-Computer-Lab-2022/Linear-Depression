import express from "express";
import mongoose from "mongoose";
import Logger from "./library/Logger";
const app = express();

/*create server*/
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

/* Routers*/

/*Health Check*/
app.get("/ping", (req, res) => {
    return res.status(200).json({ message: "pong" });
});
app.get("/test", async (_req, res) => {
    res.status(200).json({ message: "Hello World" });
});

/*404*/
app.use((req, res) => {
    const error = new Error("Not Found");
    Logger.error(error);
    return res.status(404).json({ message: error.message });
});

export default app;
