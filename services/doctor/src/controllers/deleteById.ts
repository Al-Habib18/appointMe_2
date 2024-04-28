/** @format */

import { Response, Request } from "express";
import { deleteById, findById } from "@lib/index";
import { idParamSchema } from "@schemas/index";


const deleteController = async (req: Request, res: Response) => {
    try {
        // Validate the request params
        const parsedId = idParamSchema.safeParse(req.params.id);
        if (!parsedId.success) {
            return res.status(400).json({
                message: "Invalid query parameters",
                errors: parsedId.error.issues,
            });
        }
        // check if the user already exists
        const patient = await findById(parsedId.data);
        if (!patient) {
            return res.status(400).json({ message: "Patient not found" });
        }

        //delete the doctor
        const deletedPatient = await deleteById(parsedId.data);

        return res.status(201).json({
            message: "Patient retrive successfully",
            deletedPatient,
        });
    } catch (error) {
        console.error("Error during registration:", error);
        // Handle error and return appropriate response to client
        return res.status(500).json({ message: "Error creating Patient" });
    }
};

export default deleteController;
