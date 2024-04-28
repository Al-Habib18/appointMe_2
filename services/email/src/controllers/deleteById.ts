/** @format */

import { Response, Request } from "express";
import { findById, deleteById } from "../lib/index";
import { idParamSchema } from "../schemas/index";

const deleteByIdController = async (req: Request, res: Response) => {
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

        if (!email) {
            return res.status(400).json({
                message: "email not found",
            });
        }

        // delete email
        const deletedEmail = await deleteById(parsedId.data);
        return res.status(201).json({
            message: "Email deleted  successfully",
            deletedEmail,
        });
    } catch (error) {
        console.error("Error during deleting email:", error);
        return res.status(500).json({ message: "Error deleting email" });
    }
};

export default deleteByIdController;
