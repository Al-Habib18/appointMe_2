/** @format */

import dotenv from "dotenv";

dotenv.config();
export default {
    port: process.env.PORT,
    mode: "development",
    name: "patient Service",
};

export const REDIS_HOST = process.env.REDIS_HOST || "localhost";
export const REDIS_PORT = process.env.REDIS_PORT
    ? parseInt(process.env.REDIS_PORT)
    : 6380;
