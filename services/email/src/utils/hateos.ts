/** @format */
import { generateQueryString } from "./queryString";

interface Links {
    self: string;
    next: string | undefined;
    prev: string | undefined;
}
const getHATEOAS = (data: {
    url: string;
    path: string;
    query: {};
    hasNext: boolean;
    hasPrev: boolean;
    page: number;
}) => {
    const links: Links = {
        self: `${data.url}`,
        next: undefined,
        prev: undefined,
    };

    if (data.hasNext) {
        const queryString = generateQueryString({
            ...data.query,
            page: data.page + 1,
        });
        links.next = `${data.path}?${queryString}`;
    }

    if (data.hasPrev) {
        const queryString = generateQueryString({
            ...data.query,
            page: data.page - 1,
        });
        links.prev = `${data.path}?${queryString}`;
    }
    return links;
};

export { getHATEOAS };
