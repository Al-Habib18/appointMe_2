/** @format */

import { Request, Response, NextFunction } from "express";

// Function to check if user has the required role
const hasRole = (allowedRoles: string[], userRole: string): boolean => {
    if (allowedRoles.length === 0) {
        return true;
    }
    if (allowedRoles.includes(userRole)) {
        return true;
    }

    return false;
};

// Role middleware factory
export const roleMiddleware = (allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const userRole =
            (req.headers["x-user-role"] as string) || ("" as string);

        if (!hasRole(allowedRoles, userRole)) {
            res.status(403).json({
                message: "Forbidden: Insufficient permissions",
            });
        }

        next();
    };
};
