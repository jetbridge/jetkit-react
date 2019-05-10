import * as React from 'react';
import { TextFieldProps } from '@material-ui/core/TextField';
import { ButtonProps } from '@material-ui/core/Button';
import { InputProps } from '@material-ui/core/Input';
import { WithStyles } from '@material-ui/core/styles';
import { ThemeStyle } from '@material-ui/core/styles/createTypography';
declare const styles: Record<"title" | "root" | "inputWrapperStyle" | "innerWrapper" | "submitButton" | "inputField" | "titleAndInputWrapper" | "passwordInputField" | "emailInputField", import("@material-ui/core/styles/withStyles").CSSProperties>;
interface ILoginScreenProps extends WithStyles<typeof styles> {
    title?: string;
    titleStyle?: React.CSSProperties;
    showTitle?: boolean;
    inputFieldWrapperStyle?: React.CSSProperties;
    emailTextFieldProps?: TextFieldProps;
    passwordTextFieldProps?: InputProps;
    emailLabel?: string;
    passwordLabel?: string;
    userEmail?: string;
    onInputChange?(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void;
    emailError?: boolean;
    emailHelperText?: string;
    passwordError?: boolean;
    passwordHelperText?: string;
    submitButtonProps?: ButtonProps;
    titleVariant?: ThemeStyle;
}
declare const _default: React.ComponentType<Pick<React.PropsWithChildren<ILoginScreenProps>, "title" | "children" | "showTitle" | "emailTextFieldProps" | "passwordTextFieldProps" | "emailLabel" | "userEmail" | "onInputChange" | "submitButtonProps" | "titleVariant" | "titleStyle" | "inputFieldWrapperStyle" | "passwordLabel" | "emailError" | "emailHelperText" | "passwordError" | "passwordHelperText"> & import("@material-ui/core/styles").StyledComponentProps<"title" | "root" | "inputWrapperStyle" | "innerWrapper" | "submitButton" | "inputField" | "titleAndInputWrapper" | "passwordInputField" | "emailInputField">>;
export default _default;
