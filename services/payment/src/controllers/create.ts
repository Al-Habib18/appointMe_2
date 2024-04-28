/** @format */

import { Response, Request } from "express";
import { paymentCreateSchema } from "@schemas/index";
import { getGatewayPageURL } from "@lib/sslCommerz";
import { getPaymentByAppointmentId } from "@lib/index";
import axios from "axios";
import { appointment_service_rul } from "config/default";

const createController = async (req: Request, res: Response) => {
    try {
        const parsedBody = paymentCreateSchema.safeParse(req.body);
        if (!parsedBody.success) {
            return res.status(400).json({ errors: parsedBody.error.errors });
        }

        const { appointment_id } = parsedBody.data;
        // retrive appointment fee from appointment service
        const apiResponse = await axios.get(
            `${appointment_service_rul}/appointments/${appointment_id}`
        );
        const appointment = apiResponse.data.appointment;
        if (!appointment) {
            return res
                .status(404)
                .json({ message: "Appointment doesnot exist" });
        }
        if (appointment.status !== "confirmed") {
            return res
                .status(400)
                .json({ message: "Appiontment is not confimed" });
        }
        // retrive a payment by appointment
        const amount = apiResponse.data.appointment.fee;
        const payment = await getPaymentByAppointmentId(
            parsedBody.data.appointment_id
        );

        if (payment) {
            return res
                .status(400)
                .json({ message: "Appointment already Paid" });
        }

        //init payment
        const tran_id = parsedBody.data.appointment_id;
        const gatewayPageURL = await getGatewayPageURL(tran_id, amount);
        return res.status(201).json({
            message: "gatewayPageURL created  successfully",
            gatewayPageURL,
        });
    } catch (error) {
        console.error("Error during payment initiation ::", error);
        // Handle error and return appropriate response to client
        return res.status(500).json({ message: "Error intialing payment" });
    }
};

export default createController;
