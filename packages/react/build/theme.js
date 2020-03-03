"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const styles_1 = require("@material-ui/core/styles");
const primaryFont = ['rawline', 'Raleway', 'sans-serif'].join(',');
const primaryLightColor = '#354A72';
const darkContrastTextColor = '#e1e1e1';
// All the following keys are optional.
// We try our best to provide a great default value.
const theme = styles_1.createMuiTheme({
    palette: {
        primary: {
            contrastText: darkContrastTextColor,
            main: '#22365B',
            light: '#334567',
            dark: '#141922',
        },
        secondary: {
            // contrastText: darkContrastTextColor,
            main: '#7BB1C0',
            light: '#6ba3b2',
            dark: '#af4e3b',
        },
        background: { default: '#f5f5f5', paper: 'white' },
    },
    typography: {
        fontFamily: primaryFont,
    },
    navWidth: 270,
});
const withTheme = (Component) => class withTheme extends React.Component {
    render() {
        return (React.createElement(styles_1.MuiThemeProvider, { theme: theme },
            React.createElement("link", { href: "https://s3-us-west-2.amazonaws.com/jb-services.com/rawline.css", rel: "stylesheet" }),
            React.createElement("link", { href: "https://fonts.googleapis.com/css?family=Raleway:200,300,400,500,600,700,900", rel: "stylesheet" }),
            React.createElement(Component, Object.assign({}, this.props))));
    }
};
exports.default = withTheme;
//# sourceMappingURL=theme.js.map