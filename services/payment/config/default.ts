/** @format */

import dotenv from "dotenv";

dotenv.config();
export default {
    port: process.env.PORT,
    mode: "development",
    name: "Payment Service",
};

export const appointment_service_rul =
    process.env.APPOINTMENT_SERVICE_URL || "http://appointment:4004";

export const default_email_sender =
    process.env.DEFAULT_EMAIL_SENDER || "alhabib@gmail.com";
