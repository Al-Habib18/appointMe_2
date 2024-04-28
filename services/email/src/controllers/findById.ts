/** @format */

import { Response, Request } from "express";
import { findById } from "../lib/index";
import { idParamSchema } from "../schemas/index";

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
        // retrive a simgle email
        const email = await findById(parsedId.data);

        return res.status(201).json({
            message: "Email retrive successfully",
            email,
        });
    } catch (error) {
        console.error("Error during retrivation email:", error);
        return res.status(500).json({ message: "Error retriveing email" });
    }
};

export default findByIdController;
