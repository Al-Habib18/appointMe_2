/** @format */
import "module-alias/register";
import cors from "cors";
import express, { Application } from "express";
import path from "path";
import swaggerUI from "swagger-ui-express";
import YML from "yamljs";
import router from "@routes/index";
import { receiveFromQueue } from "../utils/reciver";

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use cors
app.use(cors());
app.use(router);

// SwaggerUI
const swaggerDocs = YML.load(path.join(__dirname, "../docs", "swagger.yaml"));
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// Check Health
app.get("/health", (_req, res) => {
    res.status(200).json({ message: "UP" });
});

receiveFromQueue()
    .then(() => {
        console.log("Reciving Data From Queue....");
    })
    .catch((err) => {
        console.log("Error Occured in Reciving queue :: ", err);
    });

export default app;
