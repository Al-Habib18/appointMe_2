/** @format */
import { z } from "zod";

import { emailStatus, emailSource } from "@prisma/client";

export const createEmailSchema = z.object({
    from: z.string().email(),
    to: z.string().email(),
    subject: z.string(),
    text: z.string(),
    source: z.nativeEnum(emailSource).optional(),
    statue: z.nativeEnum(emailStatus).optional(),
});

export const idParamSchema = z.string();

export const queryParamsSchema = z.object({
    limit: z.number().positive().optional(), // Optional positive integer
    page: z.number().positive().optional(), // Optional positive integer
    sortType: z.string().optional(), // Optional string
});
