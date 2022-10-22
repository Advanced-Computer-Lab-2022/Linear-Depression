import mongoose from "mongoose";
import dotenv from "dotenv";

export async function connectDBForTesting() {
    try {
        dotenv.config();
        const dbUri = process.env.MONGO_TEST_URL || "";
        const dbName = "test";
        await mongoose.connect(dbUri, {
            dbName,
            autoCreate: true
        });
        // destroy all data in the database
        await mongoose.connection.db.dropDatabase();
    } catch (error) {
        console.log("DB connect error");
    }
}

export async function disconnectDBForTesting() {
    try {
        // destroy all data in the database
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close();
    } catch (error) {
        console.log(error);
        console.log("DB disconnect error");
    }
}
