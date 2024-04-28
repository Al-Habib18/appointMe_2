/** @format */

import { Response, Request } from "express";
import { findById } from "@lib/index";
import { idParamSchema } from "@schemas/index";

const findByIdcontroller = async (req: Request, res: Response) => {
    try {
        //Validate the querey params
        const parsedId = idParamSchema.safeParse(req.params.id);
        if (!parsedId.success) {
            return res.status(400).json({
                message: "Invalid query parameters",
                errors: parsedId.error.issues,
            });
        }
        // retrive a simgle doctor
        const doctor = await findById(parsedId.data);
        if (!doctor) {
            return res.status(404).json({
                message: "Doctor Doesn't Found",
            });
        }

        return res.status(201).json({
            message: "doctor retrive successfully",
            doctor,
        });
    } catch (error) {
        console.error("Error during retrivation:", error);
        return res.status(500).json({ message: "Error retriveing doctor" });
    }
};

export default findByIdcontroller;
