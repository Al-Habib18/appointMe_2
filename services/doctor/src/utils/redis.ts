/** @format */

import { Redis } from "ioredis";
import { REDIS_HOST, REDIS_PORT } from "../../config/default";

const redis = new Redis({ port: REDIS_PORT, host: REDIS_HOST });

export const getExistingKey = async (key: string) => {
    return await redis.exists(key);
};

export const setDoctors = async (key: string, value: string) => {
    return await redis.set(key, value);
};

export const getDoctors = async (key: string) => {
    return await redis.get(key);
};

export const deleteKey = async (key: string) => {
    await redis.del(key);
};
