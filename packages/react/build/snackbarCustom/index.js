"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
// import { Button, Icon, Snackbar, SnackbarContent } from '@material-ui/core'
const Button_1 = require("@material-ui/core/Button");
const Snackbar_1 = require("@material-ui/core/Snackbar");
const SnackbarContent_1 = require("@material-ui/core/SnackbarContent");
const Close_1 = require("@material-ui/icons/Close");
const styles_1 = require("@material-ui/styles");
const amber_1 = require("@material-ui/core/colors/amber");
const green_1 = require("@material-ui/core/colors/green");
const classnames_1 = require("classnames");
const useStyles = styles_1.makeStyles({
    base: {
        display: 'flex',
        flexDirection: 'row',
    },
    success: {
        backgroundColor: green_1.default[600],
    },
    error: {
        backgroundColor: '#ee625d',
    },
    info: {
        backgroundColor: '#4080ee',
    },
    warning: {
        backgroundColor: amber_1.default[700],
    },
    default: {
        backgroundColor: '#959595',
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
});
const CustomSnackbarContent = (props) => {
    const { handleClose, message, messageType } = props;
    const classes = useStyles();
    const getType = React.useCallback(messageType => {
        switch (messageType) {
            case 'success':
                return classes.success;
            case 'warning':
                return classes.warning;
            case 'info':
                return classes.info;
            case 'error':
                return classes.error;
            default:
                return classes.default;
        }
    }, [classes]);
    return (React.createElement(SnackbarContent_1.default, { key: message, className: classnames_1.default(getType(messageType), classes.base), "aria-describedby": "client-snackbar", message: React.createElement("span", { id: "client-snackbar", className: classes.message }, message), action: [
            React.createElement(Close_1.default, { key: "close", onClick: handleClose }, "close"),
        ] }));
};
const SnackbarCustom = (props) => {
    const { open, handleClose } = props;
    return (React.createElement(Snackbar_1.default, { key: props.message, anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
        }, open: open, autoHideDuration: props.messageType === 'error' ? undefined : 4000, onClose: handleClose, action: [
            React.createElement("div", { key: "undo" },
                ",",
                React.createElement(Button_1.default, { color: "secondary", size: "small", onClick: handleClose }, "UNDO"),
                ",",
                React.createElement(Close_1.default, { onClick: handleClose }, "close"),
                ","),
        ] },
        React.createElement(CustomSnackbarContent, Object.assign({}, props))));
};
exports.default = SnackbarCustom;
//# sourceMappingURL=index.js.map