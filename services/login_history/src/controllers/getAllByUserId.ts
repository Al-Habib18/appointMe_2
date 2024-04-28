/** @format */

import { Response, Request } from "express";
import { getLoginHistoryByUserId } from "@lib/index";
import { queryParamsSchema } from "@schemas/index";

const getLoginHistoryByUserIdController = async (
    req: Request,
    res: Response
) => {
    try {
        // Validate the request params
        let { limit, page, sortType } = req.query;
        const { user_id } = req.params;

        let defaultLimit;
        if (!limit) defaultLimit = 10;
        else defaultLimit = Number(limit);

        let defaultPage;
        if (!page) defaultLimit = 1;
        else defaultPage = Number(page);

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
        const login_histories = await getLoginHistoryByUserId(user_id, {
            ...data,
        });

        return res.status(201).json({
            message: "login_histories retrive successful",
            login_histories,
        });
    } catch (error) {
        console.error("Error during retriving login_histories:", error);
        return res
            .status(500)
            .json({ message: "Error creating login_histories" });
    }
};

export default getLoginHistoryByUserIdController;
