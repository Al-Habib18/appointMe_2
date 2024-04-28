/** @format */

import { Response, Request } from "express";
import { createEmailSchema } from "../schemas/index";
import { defaultSender } from "../../config/default";
import { sendAuthMail } from "../recivers/create";

const createController = async (req: Request, res: Response) => {
    try {
        // check sender existence
        if (req.body.sender === undefined) req.body.sender = defaultSender;

        // Validate the request body
        const parsedBody = createEmailSchema.safeParse(req.body);
        if (!parsedBody.success) {
            return res.status(400).json({ errors: parsedBody.error.errors });
        }

        //create mail option
        const { from, to, subject, text } = parsedBody.data;
        const emailOption = {
            from,
            to,
            subject,
            text,
        };
        const email = sendAuthMail(emailOption);

        // Create the email

        console.log("email created: ", email);

        return res.status(201).json({
            message: "Email sent successfully",
            email,
        });
    } catch (error) {
        console.error("Error during creating email:", error);
        return res.status(500).json({ message: "Error creating email" });
    }
};

export default createController;
