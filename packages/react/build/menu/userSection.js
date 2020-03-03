"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Typography_1 = require("@material-ui/core/Typography");
const ExpandMore_1 = require("@material-ui/icons/ExpandMore");
const IconButton_1 = require("@material-ui/core/IconButton");
const styles_1 = require("@material-ui/core/styles");
const styles = () => styles_1.createStyles({
    img: {
        borderRadius: '50%',
        marginLeft: '10%',
    },
    userNameAndExpandIconWrapper: {
        display: 'flex',
        alignItems: 'center',
    },
    userName: {
        fontSize: 18,
        fontFamily: 'Avenir',
    },
});
const UserSection = ({ avatarSrc, userName, classes }) => {
    return (React.createElement("div", { style: { marginTop: 20 } },
        React.createElement("img", { width: "100", height: "100", className: classes.img, src: avatarSrc, alt: "avatar" }),
        React.createElement("span", { className: classes.userNameAndExpandIconWrapper },
            React.createElement(Typography_1.default, { className: classes.userName }, userName),
            React.createElement(IconButton_1.default, null,
                React.createElement(ExpandMore_1.default, null)))));
};
exports.default = styles_1.withStyles(styles)(UserSection);
//# sourceMappingURL=userSection.js.map