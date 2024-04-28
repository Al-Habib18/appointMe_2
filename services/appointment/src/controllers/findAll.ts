/** @format */
import { Response, Request } from "express";
import { getAllAppointments, countTotal } from "@lib/index";
import { queryParamsSchema } from "@schemas/index";
import { getPagination } from "@utils/pagination";
import { getHATEOAS } from "@utils/hateos";

const getAllController = async (req: Request, res: Response) => {
    try {
        let { limit, page, sortType } = req.query;

        const defaultLimit = Number(limit) || 10;
        const defaultPage = Number(page) || 1;
        if (!sortType) sortType = "asc";

        //   validate query params
        const parsedParams = queryParamsSchema.safeParse({
            limit: defaultLimit,
            page: defaultPage,
            sortType: sortType,
        });
        if (!parsedParams.success) {
            return res.status(400).json({
                message: "invalid query parameter",
                errors: parsedParams.error.errors,
            });
        }

        // retrive all appointments
        const appointments = await getAllAppointments({ ...parsedParams.data });
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

        return res.status(200).json({
            message: "success",
            data: appointments,
            pagination,
            links,
        });
    } catch (error) {
        console.error("Error during appointments retrivation :", error);
        // Handle error and return appropriate response to client
        return res
            .status(500)
            .json({ message: "Error retrieving appointment" });
    }
};

export default getAllController;
