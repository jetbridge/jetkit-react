"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Card_1 = require("@material-ui/core/Card");
const Typography_1 = require("@material-ui/core/Typography");
const TextField_1 = require("@material-ui/core/TextField");
const Button_1 = require("@material-ui/core/Button");
const Input_1 = require("@material-ui/core/Input");
const InputAdornment_1 = require("@material-ui/core/InputAdornment");
const IconButton_1 = require("@material-ui/core/IconButton");
const InputLabel_1 = require("@material-ui/core/InputLabel");
const Visibility_1 = require("@material-ui/icons/Visibility");
const VisibilityOff_1 = require("@material-ui/icons/VisibilityOff");
const FormControl_1 = require("@material-ui/core/FormControl");
const styles_1 = require("@material-ui/core/styles");
const styles = styles_1.createStyles({
    root: {
        width: 450,
    },
    inputWrapperStyle: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {},
    innerWrapper: {
        display: 'flex',
        flexDirection: 'column',
    },
    submitButton: {
        width: '100%',
        marginTop: 30,
    },
    inputField: {
        width: '100%',
    },
    titleAndInputWrapper: {
        padding: '50px 60px',
    },
    passwordInputField: {
        marginTop: 40,
    },
    emailInputField: {
        marginTop: 60,
    },
});
const LoginScreen = ({ title = 'Login', showTitle = true, emailTextFieldProps, passwordTextFieldProps, emailLabel = 'Email', userEmail = '', onInputChange, submitButtonProps, classes, titleVariant = 'h3', onSubmitClick, }) => {
    const [inputFields, setInputValues] = React.useState({
        email: userEmail,
        password: '',
        showPassword: false,
    });
    const handleInputChange = (key) => (event) => {
        event.persist(); // to avoid React optimizations which can make event.target = null
        setInputValues(prevState => ({
            ...prevState,
            [key]: event.target.value,
        }));
        if (onInputChange)
            onInputChange({ event, key });
    };
    const handleClickShowPassword = () => {
        setInputValues({ ...inputFields, showPassword: !inputFields.showPassword });
    };
    return (React.createElement(Card_1.default, { className: classes.root },
        React.createElement("div", { className: classes.innerWrapper },
            React.createElement("div", { className: classes.titleAndInputWrapper },
                showTitle && (React.createElement(Typography_1.default, { variant: titleVariant, className: classes.title }, title)),
                React.createElement("form", { className: classes.inputWrapperStyle },
                    React.createElement(TextField_1.default, Object.assign({ type: "email", inputProps: {
                            'data-testid': 'email',
                        }, autoComplete: "email", className: `${classes.inputField} ${classes.emailInputField}`, label: emailLabel }, emailTextFieldProps, { value: inputFields.email, onChange: handleInputChange('email') })),
                    React.createElement(FormControl_1.default, { className: `${classes.inputField} ${classes.passwordInputField}` },
                        React.createElement(InputLabel_1.default, { htmlFor: "adornment-password" }, "Password"),
                        React.createElement(Input_1.default, Object.assign({ inputProps: {
                                'data-testid': 'password',
                            }, type: inputFields.showPassword ? 'text' : 'password', autoComplete: "password" }, passwordTextFieldProps, { onChange: handleInputChange('password'), endAdornment: React.createElement(InputAdornment_1.default, { position: "end" },
                                React.createElement(IconButton_1.default, { "aria-label": "Toggle password visibility", onClick: handleClickShowPassword }, inputFields.showPassword ? React.createElement(Visibility_1.default, null) : React.createElement(VisibilityOff_1.default, null))) })))))),
        React.createElement(Button_1.default, Object.assign({ disabled: !inputFields.email || !inputFields.password, className: classes.submitButton, onClick: onSubmitClick }, submitButtonProps), "Submit")));
};
exports.default = styles_1.withStyles(styles)(LoginScreen);
//# sourceMappingURL=index.js.map