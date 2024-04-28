/** @format */

import { Response, Request } from "express";
import prisma from "@schemas/prisma";

const deleteAllController = async (_req: Request, res: Response) => {
    try {
        await prisma.appointment.deleteMany();
        return res.status(200).json({
            message: "All appointments deleted successfully",
        });
    } catch (error) {
        console.error("Error during retrivation:", error);
        return res
            .status(500)
            .json({ message: "Error retriveing appointment" });
    }
};

export default deleteAllController;
