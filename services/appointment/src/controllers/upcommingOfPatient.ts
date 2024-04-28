/** @format */
import { Response, Request } from "express";
import { getUpcomingAppointmentsByPatientId } from "@lib/index";
import { queryParamsSchema, idParamSchema } from "@schemas/index";

const upcomingOfPatientController = async (req: Request, res: Response) => {
    try {
        // validate query params
        let { limit, page, sortType } = req.query;

        const { id } = req.params;
        const parsedId = idParamSchema.safeParse(id);
        if (!parsedId.success) {
            return res.status(404).json({
                message: "invalid query parameter",
                errors: parsedId.error.errors,
            });
        }

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
                message: "invalid query parameter",
                errors: parsedParams.error.errors,
            });
        }
        const { data } = parsedParams;
        // retrive all appointments
        const appointments = await getUpcomingAppointmentsByPatientId(id, data);

        return res.status(200).json({ message: "success", data: appointments });
    } catch (error) {
        console.error("Error during appointment creation :", error);
        return res.status(500).json({ message: "Error creating appintment" });
    }
};

export default upcomingOfPatientController;
