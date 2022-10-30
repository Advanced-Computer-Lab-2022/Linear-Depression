import dotenv from "dotenv";

dotenv.config();

const MONGO_URL = process.env.MONGO_URL || "";

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 3000;
const FRONT_END_URL = process.env.FRONT_END_URL || "http://localhost:3000";
export const config = {
    mongo: {
        config: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    },
    FRONT_END_URL: FRONT_END_URL
};
