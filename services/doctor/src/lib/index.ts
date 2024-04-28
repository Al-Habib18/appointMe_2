/** @format */

import prisma from "@schemas/prisma";
import { notFound } from "@utils/error";

// check if the user already exists
const getExitingDoctor = async (email: string) => {
    const user = await prisma.doctor.findUnique({ where: { email } });
    return user;
};

// retrive all patient
const getAllDoctor = async (data: {
    limit?: number | undefined;
    page?: number | undefined;
    sortType?: string | undefined;
}) => {
    try {
        if (data.page === undefined) data.page = 1;
        if (data.limit === undefined) data.limit = 10;
        if (data.sortType === undefined) data.sortType = "asc";

        const doctors = await prisma.doctor.findMany({
            skip: data.limit * (data.page - 1) || 0,
            take: data.limit || 10,
            orderBy: { id: data.sortType === "asc" ? "asc" : "desc" },
        });
        return doctors;
    } catch (error) {
        console.error("Error getting doctors:", error);
        return null;
    }
};

// retrive doctor by id
const findById = async (id: string) => {
    try {
        const doctor = await prisma.doctor.findFirst({ where: { id } });
        return doctor;
    } catch (error) {
        console.error("Error getting patients:", error);
        return null;
    }
};

// create a new doctor
const createDoctor = async (data: {
    auth_user_id: string;
    name: string;
    email: string;
    license: string;
    specialty: string;
    phone?: string | undefined;
    profile_picture?: string | undefined;
    bio?: string | undefined;
    years_of_experience?: number | 0;
    hospital_affliation?: string | undefined;
    availability?: Date | undefined;
}) => {
    try {
        const doctor = await prisma.doctor.create({
            data: {
                auth_user_id: data.auth_user_id,
                name: data.name,
                email: data.email,
                license: data.license,
                specialty: data.specialty,
                phone: data.phone,
                profile_picture: data.profile_picture,
                bio: data.bio,
                years_of_experience: data.years_of_experience,
                hospital_affliation: data.hospital_affliation,
                availability: data.availability,
            },
            select: {
                id: true,
                auth_user_id: true,
                name: true,
                email: true,
                phone: true,
                license: true,
                specialty: true,
                bio: true,
                years_of_experience: true,
            },
        });
        return doctor;
    } catch (error) {
        console.error("Error creating doctor :", error);
        return null;
    }
};

// update a patien
const updateById = async (
    id: string,
    data: {
        phone?: string | undefined;
        profile_picture?: string | undefined;
        bio?: string | undefined;
        years_of_experience?: number | undefined;
        hospital_affliation?: string | undefined;
        availability?: Date | undefined;
    }
) => {
    try {
        const doctor = await prisma.doctor.findFirst({
            where: {
                id: id,
            },
        });
        if (!doctor) {
            throw notFound();
        }
        const dataToUpdate = {
            phone: data.phone || doctor.phone,
            profile_picture: data.profile_picture || doctor.profile_picture,
            bio: data.bio || doctor.bio,
            years_of_experience:
                data.years_of_experience || doctor.years_of_experience,
            hospital_affliation:
                data.hospital_affliation || doctor.hospital_affliation,
            availability: data.availability || doctor.availability,
        };

        const updatedPatient = await prisma.doctor.update({
            where: {
                id: id,
            },
            data: dataToUpdate,
            select: {
                id: true,
                auth_user_id: true,
                name: true,
                email: true,
                phone: true,
                license: true,
                specialty: true,
                bio: true,
                years_of_experience: true,
                hospital_affliation: true,
                availability: true,
            },
        });
        return updatedPatient;
    } catch (error) {
        console.log("Error updating patient:", error);
        return null;
    }
};

// delete a patient
const deleteById = async (id: string) => {
    try {
        //TODO: Delete all review
        //TODO: Delete all appointment
        //TODO: Delete all login history

        // delete the doctor
        const patient = await prisma.doctor.delete({ where: { id } });
        return patient;
    } catch (error) {
        console.error("Error deleting patient:", error);
        return null;
    }
};

const countTotal = async () => {
    return prisma.doctor.count();
};
export {
    getExitingDoctor,
    createDoctor,
    getAllDoctor,
    findById,
    updateById,
    deleteById,
    countTotal,
};
