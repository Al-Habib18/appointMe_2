/** @format */

export const notFound = (msg = "Requested resource not found") => {
    const error = new Error(msg);
    return error;
};

export const badRequest = (msg = "Bad request") => {
    const error = new Error(msg);
    return error;
};
