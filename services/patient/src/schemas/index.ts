/** @format */

import { z } from "zod";

export const idParamSchema = z.string();

export const queryParamsSchema = z.object({
    limit: z.number().positive().optional(), // Optional positive integer
    page: z.number().positive().optional(), // Optional positive integer
    sortType: z.string().optional(), // Optional string
});

import { GenderType } from "@prisma/client";

export const patientCreateSchema = z.object({
    auth_user_id: z.string({ required_error: "auth_user_id is required" }),
    email: z.string({ required_error: "email is required" }).email(),
    name: z.string({ required_error: "name is required" }).min(3).max(255),
    phone: z
        .string()
        .min(11)
        .max(11)
        .or(z.string().regex(/^[0-9]{11}$/))
        .optional(),
    profile_picture: z.string().optional(),
    date_of_birth: z.date().optional(),
    medicalA_records: z.string().optional(),
    address: z.string().optional(),
    gender: z.nativeEnum(GenderType).optional(),
});

export const patientUpdateSchema = z.object({
    phone: z
        .string()
        .min(11)
        .max(11)
        .or(z.string().regex(/^[0-9]{11}$/))
        .optional(),
    profile_picture: z.string().optional(),
    date_of_birth: z.date().optional(),
    medicalA_records: z.string().optional(),
    address: z.string().optional(),
    gender: z.nativeEnum(GenderType).optional(),
});
