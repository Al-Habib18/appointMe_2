/** @format */

const getPagination = (totalItems: number, limit: number, page: number) => {
    const totalPage = Math.ceil(totalItems / limit);
    interface Pagination {
        page: number;
        limit: number;
        totalItems: number;
        totalPage: number;
        prev: number | undefined;
        next: number | undefined;
    }
    const pagination: Pagination = {
        page,
        limit,
        totalItems,
        totalPage,
        prev: undefined,
        next: undefined,
    };

    if (page < totalPage) {
        pagination.next = page + 1;
    }

    if (page > 1) {
        pagination.prev = page - 1;
    }

    return pagination;
};

export { getPagination };
