/** @format */

import { createEmail } from "../lib";
import { SMTP_HOST, SMTP_PORT } from "../../config/default";
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    host: SMTP_HOST || "mailhog",
    port: SMTP_PORT || 1025,
});

interface EmailOption {
    from: string;
    to: string;
    subject: string;
    text: string;
}

export const sendAuthMail = async (emailOption: EmailOption) => {
    const { rejected } = await transporter.sendMail(emailOption);
    let email;
    if (rejected.length) {
        email = await createEmail({
            from: emailOption.from,
            to: emailOption.to,
            subject: emailOption.subject,
            text: emailOption.text,
            status: "failed",
        });
        console.log("Email rejected: ", rejected);
    } else {
        email = await createEmail({
            from: emailOption.from,
            to: emailOption.to,
            subject: emailOption.subject,
            text: emailOption.text,
            status: "success",
        });
        console.log("email created successfull");
    }
    return email;
};
