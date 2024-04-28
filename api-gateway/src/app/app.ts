/** @format */
// import "module-alias/register";
import cors from "cors";
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import { configureRoutes } from "../utils/configureRoutes";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use cors
app.use(cors());

// security middleware
app.use(helmet());

// request logger
app.use(morgan("dev"));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    handler: (_req, res) => {
        res.status(429).json({
            message: "Too many requests, please try again later.",
        });
    },
});
app.use("/*", limiter);

//TODO: Auth Midleware

//TODO: routes
configureRoutes(app);

// Check Health
app.get("/health", (_req, res) => {
    res.status(200).json({ message: "UP" });
});
// 404 handler
app.use((_req, res) => {
    res.status(404).json({ message: "Not Found" });
});

// error handler
app.use((err: any, _req: Request, res: Response) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
});

export default app;
