/** @format */

import { Response, Request } from "express";
import { createAppointment } from "@lib/index";
import { appointmentCreateScehma } from "@schemas/index";
import { sendToQueue } from "@utils/index";
import { default_email_sender } from "@config/default";

const createController = async (req: Request, res: Response) => {
    try {
        // Validate the request body
        const parsedBody = appointmentCreateScehma.safeParse(req.body);
        if (!parsedBody.success) {
            return res.status(400).json({ errors: parsedBody.error.errors });
        }
        //TODO: retrive doctorname and email
        //TODO: retrive patient name and email

        // Create the auth user
        const appintment = await createAppointment({
            ...parsedBody.data,
            appointment_date: new Date(parsedBody.data.appointment_date),
        });
        console.log("appintment created: ", appintment);

        const emailOption = {
            from: default_email_sender || "alhabib@gmail.com",
            to: "",
            subject: "appointment creation",
            text: "you have success fully created a appointment",
            source: "appointment_create",
        };

        //send email to patient
        emailOption.to = "ashik@gmail.com";
        await sendToQueue(emailOption);

        // send email doctor
        emailOption.to = "raisul@gmail.com";
        emailOption.text = "A new appointment created with you.Plese check it";
        await sendToQueue(emailOption);

        return res.status(201).json({
            message: "Appointment created successfully",
            appintment,
        });
    } catch (error) {
        console.error("Error during appointment creation :", error);
        // Handle error and return appropriate response to client
        return res.status(500).json({ message: "Error creating appintment" });
    }
};

export default createController;
