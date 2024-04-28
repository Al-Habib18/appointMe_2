/** @format */

import { Response, Request } from "express";
import { findById } from "@lib/index";
import { idParamSchema } from "@schemas/index";
// import axios from "axios";
// import { EMAIL_SERVICE, USER_SERVICE } from "@/config";

// Type definition for user data (replace with your actual schema)

const getAllPatientsController = async (req: Request, res: Response) => {
    try {
        //TODO: Validate the request params
        const parsedId = idParamSchema.safeParse(req.params.id);
        if (!parsedId.success) {
            return res.status(400).json({
                message: "Invalid query parameters",
                errors: parsedId.error.issues,
            });
        }
        // retrive a simgle patient
        const patient = await findById(parsedId.data);

        return res.status(201).json({
            message: "Patient retrive successfully",
            patient,
        });
    } catch (error) {
        console.error("Error during registration:", error);
        // Handle error and return appropriate response to client
        return res.status(500).json({ message: "Error creating Patient" });
    }
};

export default getAllPatientsController;
