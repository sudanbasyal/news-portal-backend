export interface PaginationOptions {
    page?: number;
    limit?: number;
}
export interface PaginatedResponse<T> {
    data: T[];
    meta: {
        total: number;
        page: number;
        lastPage: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    };
}
