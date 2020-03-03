export interface IAPIDescriptor {
    method?: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'trace' | 'options' | 'head';
    url: string;
}
export interface Pagination {
    total: number;
    total_pages: number;
    first_page: number;
    last_page: number;
    page: number;
}
export interface IPaginatedResponse<T> extends Pagination {
    rows: T;
}
export interface IPaginatedRequest {
    page: number;
    pageSize: number;
    queryParams?: object;
}
/**
 * Returns a function that performs a paginated API request.
 */
export declare const requestPaginated: <ResponseT>({ url, method }: IAPIDescriptor) => (queryParams?: {}) => (paginatedRequest: IPaginatedRequest) => Promise<IPaginatedResponse<ResponseT>>;
export declare type FilterableAPICall<T> = (filter?: object) => (req: IPaginatedRequest) => Promise<IPaginatedResponse<T[]>>;
export declare type PaginatedRequestFunc<ResponseT> = (req: IPaginatedRequest) => Promise<IPaginatedResponse<ResponseT>>;
