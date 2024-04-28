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
        // check appointment existence
        const appointment = await findById(parsedId.data);
        if (!appointment) {
            return res.status(400).json({ message: "Appointment not found" });
        }

        //delete the doctor
        const deletedAppointment = await deleteById(parsedId.data);

        return res.status(201).json({
            message: "Appointment deleted successfully",
            deletedAppointment,
        });
    } catch (error) {
        console.error("Error during appointment deletion:", error);
        // Handle error and return appropriate response to client
        return res.status(500).json({ message: "Error deleting appointment" });
    }
};

export default deleteController;
