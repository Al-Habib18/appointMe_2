/** @format */

import { Response, Request } from "express";
import { getAllPatient, countTotal } from "@lib/index";
import { queryParamsSchema } from "@schemas/index";
import { getPagination } from "@utils/pagination";
import { getHATEOAS } from "@utils/hateos";
const getAllPatientsController = async (req: Request, res: Response) => {
    try {
        // Validate the request params
        let { limit, page, sortType } = req.query;
        const defaultLimit = Number(limit) || 10;
        const defaultPage = Number(page) || 1;

        if (!sortType) sortType = "asc";
        const parsedParams = queryParamsSchema.safeParse({
            limit: defaultLimit,
            page: defaultPage,
            sortType: sortType,
        });
        if (!parsedParams.success) {
            return res.status(400).json({
                message: "Invalid query parameters",
                errors: parsedParams.error.issues,
            });
        }

        const { data } = parsedParams;
        // retrive all patients
        const patients = await getAllPatient({ ...data });
        const totalItems = await countTotal();

        const pagination = getPagination(totalItems, defaultLimit, defaultPage);
        const links = getHATEOAS({
            url: req.url,
            path: req.path,
            query: req.query,
            hasNext: !!pagination.next,
            hasPrev: !!pagination.prev,
            page: defaultPage,
        });

        return res.status(201).json({
            message: "Patient retrive successfully",
            patients,
            pagination,
            links,
        });
    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({ message: "Error creating Patient" });
    }
};

export default getAllPatientsController;
