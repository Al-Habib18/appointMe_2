/** @format */

import { Response, Request } from "express";
import { createLoginHistorySchema } from "@schemas/index";
import { createLoginHistory } from "@lib/index";

const createController = async (req: Request, res: Response) => {
    try {
        // Validate the request body
        const parsedBody = createLoginHistorySchema.safeParse(req.body);
        if (!parsedBody.success) {
            return res.status(400).json({ errors: parsedBody.error.errors });
        }

        // Create the login_history
        const login_history = await createLoginHistory(parsedBody.data);
        console.log("login_history created: ", login_history);

        return res.status(201).json({
            message: "login_history created successfully",
            login_history,
        });
    } catch (error) {
        console.error("Error during creating login History:", error);
        return res
            .status(500)
            .json({ message: "Error creating login history" });
    }
};

export default createController;
