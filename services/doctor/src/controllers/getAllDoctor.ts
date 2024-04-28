/** @format */

import { Response, Request } from "express";
import { countTotal, getAllDoctor } from "@lib/index";
import { queryParamsSchema } from "@schemas/index";
import { getPagination } from "@utils/pagination";
import { getHATEOAS } from "@utils/hateos";
import {
    getExistingKey,
    setDoctors,
    getDoctors,
    // deleteKey,
} from "@utils/redis";

const getAllController = async (req: Request, res: Response) => {
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

        //TODO: chach doctor...
        const key = defaultPage + "-" + defaultLimit + "-" + sortType;

        let doctors: any;
        const isExist = await getExistingKey(key);
        if (isExist) {
            const serializedDoctors = await getDoctors(key); // retrive from redis
            if (serializedDoctors == null) {
                doctors = [];
            } else {
                doctors = JSON.parse(serializedDoctors);
            }

            console.log("Cache Hit .");
        } else {
            doctors = await getAllDoctor({ ...data }); // retrive from database
            const serializedDoctors = JSON.stringify(doctors);
            await setDoctors(key, serializedDoctors);
            console.log("Doctore set in key ::", key);
        }

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
            message: "Doctors retrive successfully",
            doctors,
            pagination,
            links,
        });
    } catch (error) {
        console.error("Error during retriving all doctors:", error);
        return res
            .status(500)
            .json({ message: "Error during retriving all doctors" });
    }
};

export default getAllController;
