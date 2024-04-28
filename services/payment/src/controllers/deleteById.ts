/** @format */

import { Response, Request } from "express";
import { idParamSchema } from "@schemas/index";
import { badRequest } from "@utils/error";
import { deletePayment, findById } from "@lib/index";

const deleteController = async (req: Request, res: Response) => {
    try {
        // Validate the request params
        const parsedId = idParamSchema.safeParse(req.params.id);
        if (!parsedId.success) {
            throw badRequest("invalid id");
        }

        // find existence of the payment
        const payment = await findById(parsedId.data);
        if (!payment) {
            return res.status(404).json({ message: "payment not found" });
        }

        // delete payment
        await deletePayment(parsedId.data);

        return res.status(201).json({
            message: "Payment deleted successful",
        });
    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({ message: "Error creating Patient" });
    }
};

export default deleteController;
