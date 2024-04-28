/** @format */

import { Request, Response } from "express";

import axios from "axios";

export const buildUrl = (hostname: string, path: string, req: Request) => {
    let url = `${hostname}${path}`;
    console.log("req.params :: ", req.params);
    if (req.params) {
        Object.keys(req.params).forEach((param) => {
            url = url.replace(`:${param}`, req.params[param]);
        });
    }
    console.log("rul :: ", url);
    return url;
};

const makeRequest = async (
    method: string,
    url: string,
    data: any,
    headers: any
) => {
    try {
        const { data: response } = await axios({
            method,
            url,

            data,
            headers,
        });
        return response;
    } catch (error) {
        if (error instanceof axios.AxiosError) {
            throw error;
        } else {
            throw new Error("Internal Server Error");
        }
    }
};

export const createHandler = (
    hostname: string,
    path: string,
    method: string
) => {
    return async (req: Request, res: Response) => {
        try {
            req.headers = {
                origin: "http://localhost:8080",
                "x-user-id": req.headers["x-user-id"],
                "x-user-email": req.headers["x-user-email"],
                "x-user-name": req.headers["x-user-name"],
                "x-user-role": req.headers["x-user-role"],
            };

            const url = buildUrl(hostname, path, req);

            const data = await makeRequest(method, url, req.body, req.headers);

            return res.json(data);
        } catch (error) {
            console.error(error);
            if (error instanceof axios.AxiosError) {
                return res
                    .status(error.response?.status || 500)
                    .json(error.response?.data);
            }
            return res.status(500).json({ message: "Internal Server Error" });
        }
    };
};
