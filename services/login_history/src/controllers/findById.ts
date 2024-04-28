/** @format */

import { Response, Request } from "express";
import { findById } from "@lib/index";
import { idParamSchema } from "@schemas/index";

const findByIdController = async (req: Request, res: Response) => {
    try {
        //Validate the querey params
        const parsedId = idParamSchema.safeParse(req.params.id);
        if (!parsedId.success) {
            return res.status(400).json({
                message: "Invalid query parameters",
                errors: parsedId.error.issues,
            });
        }
        // retrive a simgle login_history
        const login_history = await findById(parsedId.data);

        return res.status(201).json({
            message: "login history retrive successfully",
            login_history,
        });
    } catch (error) {
        console.error("Error during retrivation login_history:", error);
        return res
            .status(500)
            .json({ message: "Error retriveing login_history" });
    }
};

export default findByIdController;
