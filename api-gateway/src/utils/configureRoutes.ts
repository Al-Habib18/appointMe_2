/** @format */
import { Request, Response, NextFunction } from "express";
import { middlewares } from "../middlewares";
import { createHandler } from "./hadler";
import { Application } from "express";
import config from "../config/config.json";
import { service_urls } from "../config/default";
import { roleMiddleware } from "../middlewares/role";

export const getAuthMiddlewares = (names: string[]) => {
    return names.map((name) => middlewares[name as "auth"]);
};

const demoMiddleware = (_req: Request, _res: Response, next: NextFunction) => {
    next();
};

export const configureRoutes = (app: Application) => {
    Object.entries(config.services).forEach(([_name, service]) => {
        const service_name = service.name as string;
        const hostname =
            service_urls[
                service_name as
                    | "auth"
                    | "login_history"
                    | "patient"
                    | "doctor"
                    | "appointment"
                    | "payment"
                    | "email"
            ];
        service.routes.forEach((route) => {
            route.methods.forEach((method) => {
                const endpoint = `${route.path}`;
                const authMiddleware = route.middlewares
                    ? getAuthMiddlewares(route.middlewares)
                    : demoMiddleware;
                const handler = createHandler(hostname, route.path, method);
                app[method as "get" | "post" | "put" | "delete"](
                    endpoint,
                    authMiddleware,
                    roleMiddleware(route.roles),
                    handler
                );
            });
        });
    });
};
