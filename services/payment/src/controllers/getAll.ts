/** @format */

import { Response, Request } from "express";
import { getAllPayment, countTotal } from "@lib/index";
import { queryParamsSchema } from "@schemas/index";
import { getPagination } from "@utils/pagination";
import { getHATEOAS } from "@utils/hateos";

const getAllPaymentsController = async (req: Request, res: Response) => {
    try {
        // Validate the request params
        let { limit, page, sortType } = req.query;
        const defaultLimit = Number(limit);
        const defaultPage = Number(page);

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
        const payments = await getAllPayment({ ...data });
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
            message: "Payments retrive successfully",
            payments,
            pagination,
            links,
        });
    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({ message: "Error creating Patient" });
    }
};

export default getAllPaymentsController;
