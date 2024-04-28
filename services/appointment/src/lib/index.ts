/** @format */
import {
    appointmentStatus,
    appointmentType,
    paymentMethod,
    paymentStatus,
} from "@prisma/client";
import prisma from "@schemas/prisma";

const getAllAppointments = async (data: {
    limit?: number | undefined;
    page?: number | undefined;
    sortType?: string | undefined;
}) => {
    try {
        if (data.page === undefined) data.page = 1;
        if (data.limit === undefined) data.limit = 10;
        if (data.sortType === undefined) data.sortType = "asc";

        const appointments = await prisma.appointment.findMany({
            skip: data.limit * (data.page - 1) || 0,
            take: data.limit || 10,
            orderBy: { id: data.sortType === "asc" ? "asc" : "desc" },
        });
        return appointments;
    } catch (error) {
        console.log("error in getAllAppointments", error);
        return null;
    }
};

// create a new appointment
const createAppointment = async (data: {
    patient_id: string;
    patient_email: string;
    doctor_id: string;
    doctor_email: string;
    appointment_date: Date;
    fee: number;
}) => {
    const appintment = await prisma.appointment.create({
        data: {
            patient_id: data.patient_id,
            patient_email: data.patient_email,
            doctor_id: data.doctor_id,
            doctor_email: data.doctor_email,
            appointment_date: data.appointment_date,
            fee: data.fee,
        },
        select: {
            id: true,
            patient_id: true,
            patient_name: true,
            doctor_id: true,
            doctor_name: true,
            fee: true,
            appointment_date: true,
            appointment_type: true,
            status: true,
            payment_method: true,
            payment_status: true,
            location: true,
            created_at: true,
        },
    });
    return appintment;
};

// retrive an appointment by id
const findById = async (id: string) => {
    try {
        const appointment = await prisma.appointment.findFirst({
            where: { id },
        });
        return appointment;
    } catch (error) {
        console.error("Error getting appointment:", error);
        return null;
    }
};

const updateById = async (
    id: string,
    data: {
        appointment_type?: appointmentType | undefined;
        payment_method?: paymentMethod | undefined;
        payment_status?: paymentStatus | undefined;
        appointment_date?: Date | undefined;
    }
) => {
    try {
        const appintment = await findById(id);
        if (!appintment) {
            throw new Error("Appointment doesn't exist");
        }
        const dataToUpdate = {
            appointment_type: data.appointment_type
                ? data.appointment_type
                : appintment.appointment_type,
            payment_method: data.payment_method
                ? data.payment_method
                : appintment.payment_method,
            payment_status: data.payment_status
                ? data.payment_status
                : appintment.payment_status,
            appointment_date: data.appointment_date
                ? data.appointment_date
                : appintment.appointment_date,
        };
        console.log("payment_status ::", data.payment_status);
        const updatedAppointment = await prisma.appointment.update({
            where: {
                id: id,
            },
            data: dataToUpdate,
            select: {
                id: true,
                patient_id: true,
                patient_name: true,
                patient_email: true,
                doctor_id: true,
                doctor_name: true,
                doctor_email: true,
                fee: true,
                appointment_date: true,
                appointment_type: true,
                status: true,
                payment_method: true,
                payment_status: true,
                location: true,
                created_at: true,
            },
        });
        return updatedAppointment;
    } catch (error) {
        console.log("Error updating patient:", error);
        return null;
    }
};

const updateStatus = async (
    id: string,
    appointment_status: appointmentStatus
) => {
    try {
        const appintment = await findById(id);
        if (!appintment) {
            throw new Error("Appointment doesn't exist");
        }

        const updatedAppointment = await prisma.appointment.update({
            where: {
                id: id,
            },
            data: {
                status: appointment_status,
            },
            select: {
                id: true,
                patient_id: true,
                patient_name: true,
                patient_email: true,
                doctor_id: true,
                doctor_name: true,
                doctor_email: true,
                fee: true,
                appointment_date: true,
                appointment_type: true,
                status: true,
                payment_method: true,
                payment_status: true,
                location: true,
                created_at: true,
            },
        });
        return updatedAppointment;
    } catch (error) {
        console.log("Error updating patient:", error);
        return null;
    }
};

const deleteById = async (id: string) => {
    try {
        // delete the appointment
        const patient = await prisma.appointment.delete({ where: { id } });
        return patient;
    } catch (error) {
        console.error("Error deleting appointment:", error);
        return null;
    }
};

// retrive all appointment by patient id
const findAllByPatientId = async (
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

        const patientAppointments = await prisma.appointment.findMany({
            where: { patient_id: id },
            skip: data.limit * (data.page - 1) || 0,
            take: data.limit || 10,
            orderBy: { id: data.sortType === "asc" ? "asc" : "desc" },
        });
        return patientAppointments;
    } catch (error) {
        console.error("Error getting appointment:", error);
        return null;
    }
};

// retrive all upcomming appointments of a patient
const getUpcomingAppointmentsByPatientId = async (
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

        const patientAppointments = await prisma.appointment.findMany({
            where: { patient_id: id, status: "confirmed" },
            skip: data.limit * (data.page - 1) || 0,
            take: data.limit || 10,
            orderBy: { id: data.sortType === "asc" ? "asc" : "desc" },
        });
        return patientAppointments;
    } catch (error) {
        console.error("Error getting appointment:", error);
        return null;
    }
};

// retrive all upcomming appointments of a doctor
const getUpcomingAppointmentsByDoctortId = async (
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

        const patientAppointments = await prisma.appointment.findMany({
            where: { patient_id: id, status: "confirmed" },
            skip: data.limit * (data.page - 1) || 0,
            take: data.limit || 10,
            orderBy: { id: data.sortType === "asc" ? "asc" : "desc" },
        });
        return patientAppointments;
    } catch (error) {
        console.error("Error getting appointment:", error);
        return null;
    }
};

// retrive all appointment by patient id
const findAllByDoctorId = async (
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

        const doctorAppointments = await prisma.appointment.findMany({
            where: { doctor_id: id },
            skip: data.limit * (data.page - 1) || 0,
            take: data.limit || 10,
            orderBy: { id: data.sortType === "asc" ? "asc" : "desc" },
        });
        return doctorAppointments;
    } catch (error) {
        console.error("Error getting appointment:", error);
        return null;
    }
};

const countTotal = async () => {
    return prisma.appointment.count();
};

export {
    createAppointment,
    getAllAppointments,
    findById,
    deleteById,
    findAllByPatientId,
    findAllByDoctorId,
    updateById,
    updateStatus,
    getUpcomingAppointmentsByPatientId,
    getUpcomingAppointmentsByDoctortId,
    countTotal,
};
