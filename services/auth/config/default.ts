/** @format */

import dotenv from "dotenv";

dotenv.config();
export default {
    port: process.env.PORT,
    mode: "development",
    name: "Auth Service",
};

export const auth_service_url = process.env.AUTH_SERVICE_URL;

export const login_history_serivce_url = process.env.LOGIN_HISTORY_SERVICE_URL;

export const patient_service_url = process.env.PATIENT_SERVICE_URL;

export const doctor_service_url =
    process.env.DOCTOR_SERVICE_URL || "http://localhost:4003";

export const email_service_url = process.env.EMAIL_SERVICE_URL;

export const default_email_sender = process.env.EMAIL_SENDER;

export const QUEUE_URL =
    process.env.QUEUE_URL || "amqp://guest:guest@localhost:5672";
