"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const sortParams = (params) => Object.keys(params)
    .sort()
    .reduce((a, c) => ((a[c] = params[c]), a), {});
/**
 * Returns a function that performs a paginated API request.
 */
exports.requestPaginated = ({ url, method = 'get' }) => (queryParams = {}) => async (paginatedRequest) => {
    // GET only
    if (method !== 'get')
        throw new Error('Only GET method is supported for paginated APIs right now.');
    // construct pagination params
    const paginationParams = { page: paginatedRequest.page, page_size: paginatedRequest.pageSize };
    const response = await _1.default.get(url, { params: sortParams({ ...paginationParams, ...queryParams }) });
    // pagination info lives in response header
    if (!response.headers['x-pagination']) {
        throw new Error('No pagination header, make sure that endpoint is paginated check CORS settings');
    }
    const pagination = JSON.parse(response.headers['x-pagination']);
    return {
        ...pagination,
        rows: response.data,
    };
};
//# sourceMappingURL=paginated.js.map