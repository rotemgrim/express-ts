import dotenv from "dotenv";
import fs from "fs";
import logger from "../util/logger";
import { ConnectionOptions } from "typeorm";
import path from "path";

if (fs.existsSync(".env")) {
    logger.debug("Using .env file to supply config environment variables");
    dotenv.config({ path: ".env" });
} else {
    logger.debug("Using .env.example file to supply config environment variables");
    dotenv.config({ path: ".env.example" });  // you can delete this after you create your own .env file!
}

export const ENVIRONMENT = process.env.NODE_ENV;
const prod = ENVIRONMENT === "production"; // Anything else is treated as 'dev'

export const SESSION_SECRET = process.env["SESSION_SECRET"];

if (!SESSION_SECRET) {
    logger.error("No client secret. Set SESSION_SECRET environment variable.");
    process.exit(1);
}

const dbType = (process.env["DATABASE_TYPE"] || "sqlite").toLowerCase();
export let dbConf: ConnectionOptions;
if (dbType === "sqlite") {
    dbConf = {
        type: "sqlite",
        database: path.resolve("./database.sqlite"),
    };
} else if (dbType === "mysql") {
    dbConf = {
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "",
        database: "test",
    };
}

export let redisConf: any = {
    port: 6379,
    host: "127.0.0.1",
};
