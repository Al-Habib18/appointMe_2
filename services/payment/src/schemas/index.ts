/** @format */

import { z } from "zod";

export const idParamSchema = z.string();

export const queryParamsSchema = z.object({
    limit: z.number().positive().optional(), // Optional positive integer
    page: z.number().positive().optional(), // Optional positive integer
    sortType: z.string().optional(), // Optional string
});

export const paymentCreateSchema = z.object({
    appointment_id: z.string(),
});
