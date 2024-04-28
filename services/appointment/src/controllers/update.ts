/** @format */

import { updateById } from "@lib/index";
import { idParamSchema, appintmentUpdateSchema } from "@schemas/index";
import { Response, Request } from "express";

const updateController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const parsedId = idParamSchema.safeParse(id);
        if (!parsedId.success) {
            return res.status(400).json({
                message: "invalid query parameter",
                errors: parsedId.error.errors,
            });
        }

        // //validate the request body
        const paresedBody = appintmentUpdateSchema.safeParse(req.body);
        if (!paresedBody.success) {
            console.log(paresedBody.error);
            return res.status(400).json({
                message: "invalid request body",
                errors: paresedBody.error.errors,
            });
        }

        // update the appointment
        const updatedAppointment = await updateById(
            parsedId.data,
            paresedBody.data
        );

        if (!updatedAppointment) {
            throw new Error("appointment updete failed");
        }

        return res.status(200).json({
            message: "All appointments updated successfully",
            appointment: updatedAppointment,
        });
    } catch (error) {
        console.error("Error during updating Appointment:", error);
        return res
            .status(500)
            .json({ message: "Error during updating Appointment" });
    }
};

export default updateController;
