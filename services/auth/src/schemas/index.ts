/** @format */

import { z } from "zod";
import { Role } from "@prisma/client";

export const UserCreateSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(255),
    name: z.string().min(3).max(255),
    role: z.nativeEnum(Role).optional(),
});

export const UserLoginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export const AccessTokenSchema = z.object({
    accessToken: z.string(),
});

export const refreshTokenSchema = z.object({
    refreshToken: z.string(),
});

export const EmailVerificationSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    code: z.string(),
});
