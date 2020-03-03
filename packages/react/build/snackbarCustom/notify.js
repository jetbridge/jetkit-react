"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const useSnackbar_1 = require("./useSnackbar");
const notify = {
    success: (message = 'Success') => {
        const notifyEvent = new CustomEvent(useSnackbar_1.SNACKBAR_NOTIF_EVENT, { detail: { message, messageType: 'success' } });
        document.dispatchEvent(notifyEvent);
    },
    warning: (message = 'Error') => {
        const notifyEvent = new CustomEvent(useSnackbar_1.SNACKBAR_NOTIF_EVENT, { detail: { message, messageType: 'warning' } });
        document.dispatchEvent(notifyEvent);
    },
    error: (message = '') => {
        const notifyEvent = new CustomEvent(useSnackbar_1.SNACKBAR_NOTIF_EVENT, { detail: { message, messageType: 'error' } });
        document.dispatchEvent(notifyEvent);
    },
};
exports.default = notify;
//# sourceMappingURL=notify.js.map