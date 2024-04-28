/** @format */

import prisma from "../schemas/prisma";
import { emailSource, emailStatus } from "@prisma/client";
// import { notFound } from "@utils/error";

// create a new email
const createEmail = async (data: {
    from: string;
    to: string;
    subject: string;
    text: string;
    source?: emailSource | undefined;
    status?: emailStatus | undefined;
}) => {
    try {
        const email = await prisma.email.create({
            data: {
                from: data.from,
                to: data.to,
                subject: data.subject,
                text: data.text,
                source: data.source,
                status: data.status,
            },
            select: {
                id: true,
                from: true,
                to: true,
                subject: true,
                text: true,
                source: true,
                status: true,
                createdAt: true,
            },
        });
        return email;
    } catch (error) {
        console.error("Error creating emails:", error);
        return null;
    }
};

// retrive a list of emails
const getAllEmails = async (data: {
    limit?: number | undefined;
    page?: number | undefined;
    sortType?: string | undefined;
}) => {
    try {
        if (data.page === undefined) data.page = 1;
        if (data.limit === undefined) data.limit = 10;
        if (data.sortType === undefined) data.sortType = "asc";

        const emails = await prisma.email.findMany({
            skip: data.limit * (data.page - 1) || 0,
            take: data.limit || 10,
            orderBy: { id: data.sortType === "asc" ? "asc" : "desc" },
        });
        return emails;
    } catch (error) {
        console.error("Error getting emails:", error);
        return null;
    }
};

// retrive email by id
const findById = async (id: string) => {
    try {
        const email = await prisma.email.findFirst({ where: { id } });
        return email;
    } catch (error) {
        console.error("Error getting email:", error);
        return null;
    }
};

//delete by id
const deleteById = async (id: string) => {
    try {
        const email = await prisma.email.delete({ where: { id } });
        return email;
    } catch (error) {
        console.error("Error deleteing email:", error);
        return null;
    }
};

const getTotal = async () => {
    return prisma.email.count();
};
export { createEmail, getAllEmails, findById, deleteById, getTotal };
