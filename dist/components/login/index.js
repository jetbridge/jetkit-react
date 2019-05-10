import * as React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import { createStyles, withStyles } from '@material-ui/core/styles';
const styles = createStyles({
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
const LoginScreen = ({ title = 'Login', showTitle = true, emailTextFieldProps, passwordTextFieldProps, emailLabel = 'Email', userEmail = '', onInputChange, submitButtonProps, classes, titleVariant = 'h3', }) => {
    const [inputFields, setInputValues] = React.useState({
        email: userEmail,
        password: '',
        showPassword: false,
    });
    const handleInputChange = (key) => (event) => {
        event.persist(); // to avoid React optimizations which can make event.target = null
        setInputValues(prevState => (Object.assign({}, prevState, { [key]: event.target.value })));
        if (onInputChange)
            onInputChange(event);
    };
    const handleClickShowPassword = () => {
        setInputValues(Object.assign({}, inputFields, { showPassword: !inputFields.showPassword }));
    };
    return (React.createElement(Card, { className: classes.root },
        React.createElement("div", { className: classes.innerWrapper },
            React.createElement("div", { className: classes.titleAndInputWrapper },
                showTitle && (React.createElement(Typography, { variant: titleVariant, className: classes.title }, title)),
                React.createElement("form", { className: classes.inputWrapperStyle },
                    React.createElement(TextField, Object.assign({ type: "email", autoComplete: "email", className: `${classes.inputField} ${classes.emailInputField}`, label: emailLabel }, emailTextFieldProps, { value: inputFields.email, onChange: handleInputChange('email') })),
                    React.createElement(FormControl, { className: `${classes.inputField} ${classes.passwordInputField}` },
                        React.createElement(InputLabel, { htmlFor: "adornment-password" }, "Password"),
                        React.createElement(Input, Object.assign({ type: inputFields.showPassword ? 'text' : 'password', autoComplete: "password" }, passwordTextFieldProps, { onChange: handleInputChange('password'), endAdornment: React.createElement(InputAdornment, { position: "end" },
                                React.createElement(IconButton, { "aria-label": "Toggle password visibility", onClick: handleClickShowPassword }, inputFields.showPassword ? React.createElement(Visibility, null) : React.createElement(VisibilityOff, null))) })))))),
        React.createElement(Button, Object.assign({ className: classes.submitButton }, submitButtonProps), "Submit")));
};
export default withStyles(styles)(LoginScreen);
//# sourceMappingURL=index.js.map