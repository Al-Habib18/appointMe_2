/** @format */

import { Response, Request } from "express";
import { getExitingUser, createUser, createVerifiactionCode } from "@lib/index";
import { generateHash } from "@utils/index";
import { sendToQueue } from "../sender/auth";
import { UserCreateSchema } from "@schemas/index";
import axios from "axios";
import {
    patient_service_url,
    doctor_service_url,
    default_email_sender,
} from "@config/default";

const registrationController = async (req: Request, res: Response) => {
    try {
        // Validate the request body
        const parsedBody = UserCreateSchema.safeParse(req.body);
        if (!parsedBody.success) {
            return res.status(400).json({ errors: parsedBody.error.errors });
        }

        // Check if the user already exists
        const existingUser = await getExitingUser(parsedBody.data.email);
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hash the password
        const hashedPassword = await generateHash(parsedBody.data.password);

        // Create the auth user
        const user = await createUser({
            ...parsedBody.data,
            password: hashedPassword,
            role: "ADMIN",
        });
        if (!user) {
            return res.status(500).json({ message: "Error creating user__" });
        }

        // Implement user profile creation
        if (user.role === "PATIENT") {
            await axios.post(`${patient_service_url}/patients`, {
                auth_user_id: user.id,
                name: user.name,
                email: user.email,
            });
        }
        // Implement Doctor profile creation
        if (user.role === "DOCTOR") {
            await axios.post(`${doctor_service_url}/doctors`, {
                auth_user_id: user.id,
                name: user.name,
                email: user.email,
            });
        }

        //Implement verification logic
        const verificationCode = await createVerifiactionCode(user.id);
        if (!verificationCode) {
            return res
                .status(500)
                .json({ message: "Error creating verification code" });
        }

        //create mail option
        const emailOption = {
            from: default_email_sender || "alhabib@gmail.com",
            to: user.email,
            subject: "user registration",
            text: `Your Verification code is ${verificationCode}`,
            source: "user_registration",
        };

        // call an mail servce to send an email
        const exchacnge = "auth_exchange";
        const queue = "registration";
        sendToQueue(exchacnge, queue, emailOption);

        return res.status(201).json({
            message: "User created successfully",
            user,
            Code: verificationCode,
        });
    } catch (error) {
        console.error("Error during registration:", error);
        // Handle error and return appropriate response to client
        return res.status(500).json({ message: "Error creating user" });
    }
};

export default registrationController;
