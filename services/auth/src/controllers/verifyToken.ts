/** @format */

import { Request, Response } from "express";
import { AccessTokenSchema } from "@schemas/index";
import { getExitingUser } from "@lib/index";
import { decodeToken } from "@utils/index";

const verifyToken = async (req: Request, res: Response) => {
    try {
        // Validate the request body
        const parsedBody = AccessTokenSchema.safeParse(req.body);
        if (!parsedBody.success) {
            return res.status(400).json({ errors: parsedBody.error.errors });
        }

        const { accessToken } = parsedBody.data;

        // check if the user exists
        const decodedUser = await decodeToken(accessToken);
        const user = await getExitingUser(decodedUser.email);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "Authorized", user });
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};

export default verifyToken;
