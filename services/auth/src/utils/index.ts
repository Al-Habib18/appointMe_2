/** @format */

const bcrypt = require("bcryptjs");
import jwt, { JwtPayload } from "jsonwebtoken";
// import { QUEUE_URL } from "../../config/default";

const generateHash = async (payload: string, saltRound = 10) => {
    const salt = await bcrypt.genSalt(saltRound);
    return bcrypt.hash(payload, salt);
};

const hasMatched = async (raw: string, hash: string) => {
    const result = await bcrypt.compare(raw, hash);
    return result;
};

const getAccessToken = (data: {
    id: string;
    email: string;
    name: string;
    role: string;
}) => {
    const accessToken = jwt.sign(
        {
            userId: data.id,
            email: data.email,
            name: data.name,
            role: data.role,
        },
        process.env.JWT_SECRET ?? "My_Secret_Key",
        { expiresIn: "1h" }
    );
    return accessToken;
};

const decodeToken = (token: string) => {
    const user = jwt.verify(token, process.env.JWT_SECRET ?? "My_Secret_Key");
    return user as JwtPayload;
};

const getTokenExpiration = (token: string) => {
    try {
        const decoded = decodeToken(token);

        let expiration = decoded.exp;
        if (!expiration) {
            return new Error("Invalid token");
        }
        const currentTime = Math.floor(Date.now() / 1000);

        if (currentTime > expiration) {
            return true;
        }
        return false;
    } catch (err) {
        console.log(err);
        return err;
    }
};
// check token expiration

export {
    generateHash,
    hasMatched,
    getAccessToken,
    decodeToken,
    getTokenExpiration,
};
