/** @format */
import prisma from "@schemas/prisma";
import { Role } from "@prisma/client";
import jwt from "jsonwebtoken";

const getExitingUser = async (email: string) => {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
};

const createUser = async (data: {
    name: string;
    email: string;
    password: string;
    role?: Role | undefined;
}) => {
    try {
        const user = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
                role: data.role,
            },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                status: true,
                verified: true,
            },
        });
        return user;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const updateUser = async (userId: string) => {
    try {
        await prisma.user.update({
            where: { id: userId },
            data: { verified: true, status: "ACTIVE" },
        });
        return true;
    } catch (err) {
        console.log(err);
        return err;
    }
};

const generateVerificationCode = () => {
    // Get current timestamp in milliseconds
    const timestamp = new Date().getTime().toString();

    // Generate a random 2-digit number
    const randomNum = Math.floor(10 + Math.random() * 90); // Ensures 2-digit random number

    // Combine timestamp and random number and extract last 5 digits
    let code = (timestamp + randomNum).slice(-5);

    return code; //
};

// generate verification code
const createVerifiactionCode = async (userId: string) => {
    try {
        const code = generateVerificationCode();
        await prisma.verificationCode.create({
            data: {
                userId: userId,
                code,
                expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 hours
            },
        });

        return code;
    } catch (error) {
        console.log();
        return null;
    }
};

//find verification code
const getVerificationCode = async (userId: string, code: string) => {
    try {
        const verificationCode = await prisma.verificationCode.findFirst({
            where: {
                userId: userId,
                code: code,
            },
        });
        return verificationCode;
    } catch (error) {
        console.log();
        return null;
    }
};

const updateVerificationCode = async (id: string) => {
    try {
        await prisma.verificationCode.update({
            where: { id: id },
            data: { status: "USED", verifiedAt: new Date() },
        });
        return true;
    } catch (error) {
        console.log();
        return null;
    }
};

const createRefresh = async (data: {
    id: string;
    email: string;
    name: string;
    role: string;
}) => {
    const refreshToken = jwt.sign(
        {
            userId: data.id,
            email: data.email,
            name: data.name,
            role: data.role,
        },
        process.env.JWT_SECRET ?? "My_Secret_Key",
        { expiresIn: "7d" }
    );

    await prisma.refresh.create({
        data: {
            userId: data.id,
            email: data.email,
            token: refreshToken,
        },
    });

    return refreshToken;
};

const getRefresh = async (token: string) => {
    const refreshToken = await prisma.refresh.findFirst({
        where: {
            token,
        },
    });
    return refreshToken;
};

// delete refresh token
const deleteRefresh = async (token: string) => {
    //find first refresh token
    if (!token) {
        return null;
    }
    const refreshToken = await getRefresh(token);
    if (!refreshToken) {
        console.log("refresh token not found");
        return null;
    }

    // // delete refresh token
    const deletedRefreshToken = await prisma.refresh.delete({
        where: {
            id: refreshToken.id,
        },
    });
    return deletedRefreshToken;
};

export {
    getExitingUser,
    createUser,
    createVerifiactionCode,
    getVerificationCode,
    updateUser,
    updateVerificationCode,
    createRefresh,
    deleteRefresh,
    getRefresh,
};
