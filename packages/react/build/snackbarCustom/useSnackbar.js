"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const _1 = require(".");
exports.SNACKBAR_NOTIF_EVENT = 'JBSnackbarNotify';
const useSnackbar = () => {
    const [open, toggleOpen] = React.useState(false);
    const [messageType, setType] = React.useState('info');
    const [message, setMessage] = React.useState('');
    const handleClose = React.useCallback(() => {
        toggleOpen(false);
    }, []);
    const showNotification = React.useCallback((message, messageType) => {
        toggleOpen(true);
        setMessage(message);
        setType(messageType);
    }, []);
    const handleOpenFromEvent = React.useCallback((options) => {
        const message = options.detail && options.detail.message;
        if (!message)
            return;
        const messageType = options.detail ? options.detail.messageType : 'default';
        showNotification(message, messageType);
    }, [showNotification]);
    return { open, handleClose, handleOpen: showNotification, message, messageType, handleOpenFromEvent };
};
/**
 * Component to be imported in other projects for showing Material-UI notifications
 * Listens for a CustomEvent of the following format:
 * (JBSnackbarNotify, detail: { message: 'This is an alert', messageType: 'success'})
 */
exports.UseSnackbarUI = () => {
    const snackbar = useSnackbar();
    const snackbarNotifListener = React.useCallback((e) => {
        snackbar.handleOpenFromEvent(e);
    }, [snackbar]);
    React.useEffect(() => {
        document.addEventListener(exports.SNACKBAR_NOTIF_EVENT, snackbarNotifListener);
        return () => {
            document.removeEventListener(exports.SNACKBAR_NOTIF_EVENT, snackbarNotifListener);
        };
    });
    return React.createElement(_1.default, Object.assign({}, snackbar));
};
exports.default = useSnackbar;
//# sourceMappingURL=useSnackbar.js.map