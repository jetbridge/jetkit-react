"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const axios_jwt_1 = require("axios-jwt");
const axios_jwt_2 = require("axios-jwt");
// https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables
const BASE_URL = process.env.REACT_APP_BASE_URL;
exports.apiClient = axios_1.default.create();
exports.apiClient.defaults.headers.common['Content-Type'] = 'application/json';
exports.apiClient.defaults.baseURL = BASE_URL;
// query params serializer for converting params name from ids[] to ids without square brackets
const parseParams = (params) => {
    const keys = Object.keys(params);
    let options = '';
    keys.forEach(key => {
        const isParamTypeObject = typeof params[key] === 'object';
        const isParamTypeArray = isParamTypeObject && params[key].length >= 0;
        if (!isParamTypeObject) {
            options += `${key}=${params[key]}&`;
        }
        if (isParamTypeObject && isParamTypeArray) {
            params[key].forEach((element) => {
                options += `${key}=${element}&`;
            });
        }
    });
    return options ? options.slice(0, -1) : options;
};
exports.apiClient.defaults.paramsSerializer = parseParams;
// refresh token endpoint
const refreshEndpoint = `${BASE_URL}/auth/refresh`;
// transform response into IAuthTokens
exports.authResponseToAuthTokens = (res) => ({
    accessToken: res.access_token,
    refreshToken: res.refresh_token,
});
/**
 * Process an AuthResponse from auth API and save JWT.
 */
exports.setAuthTokensFromAuthResponse = async (res) => {
    // transform auth API response
    const tokenRes = exports.authResponseToAuthTokens(res);
    axios_jwt_1.setAuthTokens(tokenRes);
    return tokenRes;
};
exports.requestRefresh = async (refreshToken) => {
    // perform refresh
    const res = (await axios_1.default.post(refreshEndpoint, null, {
        headers: {
            Authorization: `Bearer ${refreshToken}`,
        },
    })).data;
    return res.access_token;
};
// JWT/refresh interceptor
axios_jwt_1.useAuthTokenInterceptor(exports.apiClient, { requestRefresh: exports.requestRefresh });
exports.refreshTokenIfNeeded = async () => axios_jwt_2.refreshTokenIfNeeded(exports.requestRefresh);
exports.default = exports.apiClient;
//# sourceMappingURL=index.js.map