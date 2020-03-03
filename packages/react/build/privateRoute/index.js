"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_router_1 = require("react-router");
const axios_jwt_1 = require("axios-jwt");
function PrivateRoute(props) {
    if (axios_jwt_1.isLoggedIn()) {
        return React.createElement(react_router_1.Route, Object.assign({}, props));
    }
    return React.createElement(react_router_1.Redirect, { to: props.fallbackRoute });
}
exports.default = PrivateRoute;
//# sourceMappingURL=index.js.map