/** @format */

import prisma from "@schemas/prisma";
import { LoginAttempt } from "@prisma/client";
// import { notFound } from "@utils/error";

const createLoginHistory = async (data: {
    auth_user_id: string;
    ip_address: string;
    user_agent: string;
    attempt?: LoginAttempt | undefined;
}) => {
    try {
        const login_history = await prisma.history.create({
            data: {
                auth_user_id: data.auth_user_id,
                ip_address: data.ip_address,
                user_agent: data.user_agent,
                attempt: data.attempt,
            },
            select: {
                id: true,
                auth_user_id: true,
                ip_address: true,
                user_agent: true,
                attempt: true,
                loginAt: true,
            },
        });
        return login_history;
    } catch (error) {
        console.error("Error creating login History:", error);
        return null;
    }
};

const getAllLoginHistory = async (data: {
    limit?: number | undefined;
    page?: number | undefined;
    sortType?: string | undefined;
}) => {
    try {
        if (data.page === undefined) data.page = 1;
        if (data.limit === undefined) data.limit = 10;
        if (data.sortType === undefined) data.sortType = "asc";

        const login_histories = await prisma.history.findMany({
            skip: data.limit * (data.page - 1) || 0,
            take: data.limit || 10,
            orderBy: { id: data.sortType === "asc" ? "asc" : "desc" },
        });
        return login_histories;
    } catch (error) {
        console.error("Error getting doctors:", error);
        return null;
    }
};

// retrive all login history of a user
const getLoginHistoryByUserId = async (
    id: string,
    data: {
        limit?: number | undefined;
        page?: number | undefined;
        sortType?: string | undefined;
    }
) => {
    try {
        if (data.page === undefined) data.page = 1;
        if (data.limit === undefined) data.limit = 10;
        if (data.sortType === undefined) data.sortType = "asc";

        const login_histories = await prisma.history.findMany({
            where: { auth_user_id: id },
            skip: data.limit * (data.page - 1) || 0,
            take: data.limit || 10,
            orderBy: { id: data.sortType === "asc" ? "asc" : "desc" },
        });
        return login_histories;
    } catch (error) {
        console.error("Error getting doctors:", error);
        return null;
    }
};

// retrive login history by id
const findById = async (id: string) => {
    try {
        const login_history = await prisma.history.findFirst({ where: { id } });
        return login_history;
    } catch (error) {
        console.error("Error getting login_history:", error);
        return null;
    }
};

const getTotal = async () => {
    return prisma.history.count();
};

export {
    createLoginHistory,
    getAllLoginHistory,
    findById,
    getLoginHistoryByUserId,
    getTotal,
};
