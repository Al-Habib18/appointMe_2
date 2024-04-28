/** @format */

import prisma from "@schemas/prisma";
import { PaymentStatus } from "@prisma/client";

interface Payment {
    id: string;
    appointment_id: string;
    transaction_id: string;
    amount: number;
    store_amount: number;
    card_type: String;
    status: PaymentStatus;
    created_at: Date;
}

export const paymentCreate = async (data: {
    appointment_id: string;
    transaction_id: string;
    amount: number;
    store_amount: number;
    card_type: string;
}) => {
    try {
        const payment: Payment = await prisma.payment.create({
            data,
        });
        return payment;
    } catch (err) {
        console.log("Error during paymentCreate:", err);
        return err;
    }
};

// retrive a paid payment by appointment_id
export const getPaymentByAppointmentId = async (appointment_id: string) => {
    try {
        const payment: Payment | null = await prisma.payment.findFirst({
            where: {
                appointment_id,
            },
        });
        return payment;
    } catch (err) {
        console.log("Error during getPaymentByAppointmentId:", err);
        return err;
    }
};

export const getAllPayment = async (data: {
    limit?: number | undefined;
    page?: number | undefined;
    sortType?: string | undefined;
}) => {
    try {
        if (data.page === undefined) data.page = 1;
        if (data.limit === undefined) data.limit = 10;
        if (data.sortType === undefined) data.sortType = "asc";

        const patients = await prisma.payment.findMany({
            skip: data.limit * (data.page - 1) || 0,
            take: data.limit || 10,
            orderBy: { id: data.sortType === "asc" ? "asc" : "desc" },
        });
        return patients;
    } catch (error) {
        console.error("Error getting patients:", error);
        return null;
    }
};

export const findById = async (id: string) => {
    try {
        const payment = await prisma.payment.findUnique({
            where: { id },
        });
        return payment;
    } catch (error) {
        console.error("Error getting patient:", error);
        return null;
    }
};

export const deletePayment = async (id: string) => {
    try {
        const deletedpayment = await prisma.payment.delete({
            where: { id },
        });
        return deletedpayment;
    } catch (error) {
        console.error("Error getting patient:", error);
        return null;
    }
};

export const getExistinPayment = async (tran_id: string) => {
    return prisma.payment.findFirst({
        where: {
            transaction_id: tran_id,
        },
    }) as Promise<Payment | null>;
};
export const countTotal = async () => {
    return await prisma.payment.count();
};
