/** @format */

import { Response, Request } from "express";
import { getAllLoginHistory, getTotal } from "@lib/index";
import { queryParamsSchema } from "@schemas/index";
import { getPagination } from "@utils/pagination";
import { getHATEOAS } from "@utils/hateos";

const getAllController = async (req: Request, res: Response) => {
    try {
        // Validate the request params
        let { limit, page, sortType } = req.query;
        console.log("limit :: ", limit, "page :: ", page);
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
        // retrive all login_histories
        const login_histories = await getAllLoginHistory({ ...data });
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
            message: "login_histories retrive successful",
            login_histories,
            pagination,
            links,
        });
    } catch (error) {
        console.error("Error during retriving login_histories:", error);
        return res
            .status(500)
            .json({ message: "Error creating login_histories" });
    }
};

export default getAllController;
