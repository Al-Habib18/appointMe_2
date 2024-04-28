/** @format */

import dotenv from "dotenv";

dotenv.config();
export default {
    port: process.env.PORT,
    mode: "development",
    name: "logiin History Service",
};

export const defaultSender = process.env.DEFAULT_SENDER || "alhabib@gmail.com";
export const SMTP_HOST = process.env.SMTP_HOST || "mailhog";
export const SMTP_PORT = parseInt(process.env.SMTP_PORT || "1025");
