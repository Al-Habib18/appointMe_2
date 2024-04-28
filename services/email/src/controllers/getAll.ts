/** @format */

import { Response, Request } from "express";
import { queryParamsSchema } from "../schemas/index";
import { getAllEmails, getTotal } from "../lib";
import { getPagination } from "../utils/pagination";
import { getHATEOAS } from "../utils/hateos";

const getAllController = async (req: Request, res: Response) => {
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
        // retrive all emailis
        const emails = await getAllEmails({ ...data });
        const totalItems = await getTotal();

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
            message: "emails retrive successful",
            emails,
            pagination,
            links,
        });
    } catch (error) {
        console.error("Error during retriving emails:", error);
        return res
            .status(500)
            .json({ message: "Error during retriving emails" });
    }
};

export default getAllController;
