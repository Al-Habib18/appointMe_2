/** @format */

import { z } from "zod";

export const idParamSchema = z.string();

export const queryParamsSchema = z.object({
    limit: z.number().positive().max(50).optional(),
    page: z.number().positive().min(1).optional(),
    sortType: z.string().optional(),
});

export const doctorCreateSchema = z.object({
    auth_user_id: z.string({ required_error: "auth_user_id is required" }),
    email: z.string({ required_error: "email is required" }).email(),
    name: z.string({ required_error: "name is required" }).min(3).max(255),
    license: z
        .string({ required_error: "license is required" })
        .min(3)
        .max(255)
        .optional(),
    specialty: z
        .string({ required_error: "specialty is required" })
        .min(3)
        .max(255)
        .optional(),
    phone: z
        .string()
        .min(11)
        .max(11)
        .or(z.string().regex(/^[0-9]{11}$/))
        .optional(),
    profile_picture: z.string().optional(),
    bio: z.string().max(50).optional(),
    years_of_experience: z.number().optional(),
    hospital_affialion: z.string().optional(),
    availability: z.date().optional(),
});

export const doctorUpdateSchema = z.object({
    license: z
        .string({ required_error: "license is required" })
        .min(3)
        .max(255),
    specialty: z
        .string({ required_error: "specialty is required" })
        .min(3)
        .max(255),
    phone: z
        .string()
        .min(11)
        .max(11)
        .or(z.string().regex(/^[0-9]{11}$/))
        .optional(),
    profile_picture: z.string().optional(),
    bio: z.string().max(50).optional(),
    years_of_experience: z.number().optional(),
    hospital_affialion: z.string().optional(),
    availability: z.date().optional(),
});
