/** @format */
import "module-alias/register";
import cors from "cors";
import express, { Application } from "express";
import path from "path";
import swaggerUI from "swagger-ui-express";
import YML from "yamljs";
import router from "@routes/index";

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use cors
app.use(cors());
app.use(router);

// SwaggerUI
const swaggerDocs = YML.load(path.join(__dirname, "../docs", "doctor.yaml"));
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// Check Health
app.get("/health", (_req, res) => {
    res.status(200).json({ message: "UP" });
});

app.use("/*", (_req, res) => {
    res.status(404).json({ message: "Not Found" });
});
export default app;
