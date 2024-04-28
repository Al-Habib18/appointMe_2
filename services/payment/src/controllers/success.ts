/** @format */

import { Response, Request } from "express";
import { paymentCreate, getExistinPayment } from "@lib/index";
import { sendToQueue } from "src/sernder";
import {
    default_email_sender,
    appointment_service_rul,
} from "../../config/default";
import axios from "axios";
const successController = async (req: Request, res: Response) => {
    try {
        const { tran_id, amount, store_amount, card_type } = req.body;

        const data = {
            appointment_id: tran_id,
            transaction_id: tran_id,
            amount: parseFloat(amount),
            store_amount: parseFloat(store_amount),
            card_type: card_type,
        };
        //check payment already exist in this transaction
        const paymentExist = await getExistinPayment(tran_id);
        if (paymentExist) {
            return res
                .status(404)
                .json({ message: "payment already done for this transaction" });
        }

        // create payment
        const payment = await paymentCreate(data);

        //update appointment payment status
        const apiResponse = await axios.put(
            `${appointment_service_rul}/appointments/${tran_id}`,
            {
                payment_status: "true",
            }
        );
        const appointment = await apiResponse.data.apointment;
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
            message: "payment successful",
            payment,
        });
    } catch (error) {
        console.error("Error during  payment", error);
        // Handle error and return appropriate response to client
        return res.status(500).json({ message: "Error creating payment" });
    }
};

export default successController;
