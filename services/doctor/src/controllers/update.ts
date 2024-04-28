/** @format */

import { Response, Request } from "express";
import { findById, updateById } from "@lib/index";
import { doctorUpdateSchema, idParamSchema } from "@schemas/index";
import { badRequest } from "@utils/error";
// import axios from "axios";
// import { EMAIL_SERVICE, USER_SERVICE } from "@/config";

const updateController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const pareseId = idParamSchema.safeParse(id);
        if (!pareseId.success) {
            throw badRequest("invalid id");
        }
        // Check if the user already exists
        const patient = await findById(pareseId.data);
        if (!patient) {
            return res.status(400).json({ message: "Patient not found" });
        }

        // Validate the request body
        const parsedBody = doctorUpdateSchema.safeParse(req.body);
        if (!parsedBody.success) {
            return res.status(400).json({ errors: parsedBody.error.errors });
        }

        // Create the auth user
        const updatedDoctor = await updateById(id, parsedBody.data);
        console.log("doctor updated: ", updatedDoctor);

        return res.status(201).json({
            message: "doctor updated successfully",
            updatedDoctor,
        });
    } catch (error) {
        console.error("Error during updating:", error);
        return res.status(500).json({ message: "Error updating doctor" });
    }
};

export default updateController;
