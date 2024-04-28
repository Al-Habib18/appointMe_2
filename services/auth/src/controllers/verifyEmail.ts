/** @format */

import { Request, Response, NextFunction } from "express";
import { EmailVerificationSchema } from "@schemas/index";
import {
    getExitingUser,
    getVerificationCode,
    updateVerificationCode,
    updateUser,
} from "@lib/index";
import { sendToQueue } from "../sender/auth";
import { default_email_sender } from "@config/default";
// import { EMAIL_SERVICE } from "@/config";

const verifyEmailController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, code } = req.body;
        // Validate the request body
        const parsedBody = EmailVerificationSchema.safeParse({ email, code });
        if (!parsedBody.success) {
            return res.status(400).json({ errors: parsedBody.error.errors });
        }

        // check if the user with email exists
        const user = await getExitingUser(parsedBody.data.email);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // find the verification code
        const verificationCode = await getVerificationCode(
            user.id,
            parsedBody.data.code
        );
        if (!verificationCode) {
            return res
                .status(404)
                .json({ message: "Invalid verification code" });
        }

        // if the code has expired
        if (verificationCode.expiresAt < new Date()) {
            return res
                .status(400)
                .json({ message: "Verification code expired" });
        }

        // update user status to verified
        await updateUser(user.id);

        // update verification code status to used
        await updateVerificationCode(verificationCode.id);

        //create mail option
        const emailOption = {
            from: default_email_sender || "alhabib@gmail.com",
            to: user.email,
            subject: "Email verification",
            text: "Email verification successfull",
            source: "email_verification",
        };

        // send success email
        const exchacnge = "auth_exchange";
        const queue = "verification";
        sendToQueue(exchacnge, queue, emailOption);

        return res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
        return next(error);
    }
};

export default verifyEmailController;
