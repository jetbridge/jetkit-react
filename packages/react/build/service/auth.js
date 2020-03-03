"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apiClient_1 = require("../apiClient");
const axios_jwt_1 = require("axios-jwt");
exports.default = {
    login: async (email, password) => {
        const res = (await apiClient_1.default.post('/auth/login', { email, password })).data;
        axios_jwt_1.setAuthTokens(apiClient_1.authResponseToAuthTokens(res));
        return res;
    },
};
//# sourceMappingURL=auth.js.map