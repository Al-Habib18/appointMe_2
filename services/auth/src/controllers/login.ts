/** @format */

import { Response, Request } from "express";
import { UserLoginSchema } from "@schemas/index";
import { getExitingUser, createRefresh } from "@lib/index";
import { hasMatched } from "@utils/index";
import { sendToQueue } from "../sender/loginHistory";

const loginController = async (req: Request, res: Response) => {
    try {
        const ipAddress =
            (req.headers["x-forwarded-for"] as string) || req.ip || "";
        const userAgent = req.headers["user-agent"] || "";

        // Validate the request body
        const parsedBody = UserLoginSchema.safeParse(req.body);
        if (!parsedBody.success) {
            return res.status(400).json({ errors: parsedBody.error.errors });
        }

        // check if the user exists
        const user = await getExitingUser(parsedBody.data.email);
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // compare password
        const isMatch = hasMatched(parsedBody.data.password, user.password);

        const loginHistory = {
            auth_user_id: user.id,
            ip_address: ipAddress,
            user_agent: userAgent,
            attempt: "FAILED",
        };

        if (!isMatch) {
            sendToQueue(loginHistory);
            return res.status(400).json({ message: "Invalid cadentials" });
        } else if (!user.verified) {
            // check user is verified
            sendToQueue(loginHistory);
            return res.status(400).json({ message: "User not verified" });
        } else if (user.status !== "ACTIVE") {
            // check if the account is active
            sendToQueue(loginHistory);
            return res.status(400).json({ message: "User not active" });
        } else {
            loginHistory.attempt = "SUCCESS";
            await sendToQueue(loginHistory);
        }

        // generate refresh token
        const refreshToken = await createRefresh({
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        });

        return res.status(200).json({
            message: "Login successful",
            refreshToken,
        });
    } catch (error) {
        console.log("error :: ", error);
        return res.status(500).json({ message: "Error logging in user" });
    }
};

export default loginController;
