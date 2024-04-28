/** @format */

import { Request, Response, NextFunction } from "express";
import { refreshTokenSchema } from "@schemas/index";
import { decodeToken, getTokenExpiration, getAccessToken } from "@utils/index";
import { getRefresh, createRefresh, deleteRefresh } from "@lib/index";

const refreshController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { refreshToken } = req.body;

        // Validate the request body
        const parsedBody = refreshTokenSchema.safeParse({ refreshToken });
        if (!parsedBody.success) {
            return res.status(400).json({ errors: parsedBody.error.errors });
        }

        // retrive the refresh
        const refresh = await getRefresh(refreshToken);
        if (!refresh) {
            return res.status(400).json({ message: "Invalid refresh token" });
        }

        const isExpired = getTokenExpiration(refresh.token);
        if (isExpired) {
            return res.status(400).json({ message: "token is expired" });
        }

        //docode the refresh token
        const user = decodeToken(refreshToken);

        // generate access token
        const newRefreshToken = await createRefresh({
            id: user.userId,
            email: user.email,
            name: user.name,
            role: user.role,
        });

        // remove access token
        await deleteRefresh(refreshToken);

        // create access token
        const accessToken = await getAccessToken({
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        });

        return res.status(200).json({
            message: "Access Token retrive Successful",
            refreshToken: newRefreshToken,
            accessToken: accessToken,
        });
    } catch (error) {
        return next(error);
    }
};

export default refreshController;
