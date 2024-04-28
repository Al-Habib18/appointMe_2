/** @format */

import axios from "axios";
import { Response, Request } from "express";
import {
    default_email_sender,
    appointment_service_rul,
} from "../../config/default";
import { sendToQueue } from "src/sernder";

const failController = async (req: Request, res: Response) => {
    try {
        const { tran_id } = req.body;
        console.log("req_body ::", req.body);
        //retrive apointment for patient email
        const apiResponse = await axios.get(
            `${appointment_service_rul}/appointments/${tran_id}`
        );
        // send email to user
        const { appointment } = await apiResponse.data;
        const patient_email = await appointment.patient_email;
        const emailOption = {
            from: default_email_sender || "alhabib@gmail.com",
            to: patient_email,
            subject: "payment success",
            text: `your have successfully paid the fee of the appointment . Your apointment id {apointment_id}`,
            source: "payment_success",
        };

        // send email to patient
        sendToQueue(emailOption);

        return res.status(201).json({
            message: "Patient created failed.please try again later",
            appointment: req.body.tran_id,
        });
    } catch (error) {
        console.error("Error during payment fail :", error);
        // Handle error and return appropriate response to client
        return res.status(500).json({ message: "Error creating payment fail" });
    }
};

export default failController;
