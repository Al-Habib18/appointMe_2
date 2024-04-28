/** @format */
import { Response, Request } from "express";
import { getPaymentByAppointmentId } from "@lib/index";
import { idParamSchema } from "@schemas/index";
import { badRequest, notFound } from "@utils/error";

const findByAppointmentIdController = async (req: Request, res: Response) => {
    try {
        // Validate the request params
        const id = req.params.id;
        const pareseId = idParamSchema.safeParse(id);
        if (!pareseId.success) {
            throw badRequest("invalid id");
        }
        // Check if the user already exists
        const payment = await getPaymentByAppointmentId(pareseId.data);
        if (!payment) {
            throw notFound("Payment not found");
        }
        return res
            .status(200)
            .json({ message: "Payment retrive succesfull", payment });
    } catch (error) {
        console.error("Error during retriving payment:", error);
        // Handle error and return appropriate response to client
        return res
            .status(500)
            .json({ message: "Error during retriving payment:" });
    }
};

export default findByAppointmentIdController;
