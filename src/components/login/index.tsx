import * as React from 'react'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import TextField, { TextFieldProps } from '@material-ui/core/TextField'
import Button, { ButtonProps } from '@material-ui/core/Button'
import Input, { InputProps } from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import InputLabel from '@material-ui/core/InputLabel'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import FormControl from '@material-ui/core/FormControl'

interface ILoginScreenClasses {
    root: string
    inputWrapperStyle: string
}

interface ILoginScreenProps {
    title?: string
    titleStyle?: React.CSSProperties
    showTitle?: boolean
    inputFieldWrapperStyle?: React.CSSProperties
    emailTextFieldProps?: TextFieldProps
    passwordTextFieldProps?: InputProps
    emailLabel?: string
    passwordLabel?: string
    userEmail?: string
    onInputChange?(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void
    emailError?: boolean
    emailHelperText?: string
    passwordError?: boolean
    passwordHelperText?: string
    classes?: ILoginScreenClasses
    submitButtonProps?: ButtonProps
}

interface LoginScreenState {
    email: string
    password: string
    showPassword: boolean
}

const LoginScreen: React.FunctionComponent<ILoginScreenProps> = ({
    title = 'Login',
    titleStyle,
    showTitle,
    emailTextFieldProps,
    passwordTextFieldProps,
    emailLabel = 'Email',
    userEmail = '',
    onInputChange,
    classes,
    submitButtonProps,
}) => {
    const [inputFields, setInputValues] = React.useState<LoginScreenState>({
        email: userEmail,
        password: '',
        showPassword: false,
    })

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!event.target) return
        setInputValues(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }))
        if (onInputChange) onInputChange(event)
    }

    const handleClickShowPassword = () => {
        setInputValues({ ...inputFields, showPassword: !inputFields.showPassword })
    }

    return (
        <Card className={classes && classes.root}>
            {showTitle && <Typography style={titleStyle}>{title}</Typography>}
            <div className={classes && classes.inputWrapperStyle}>
                <form>
                    <TextField
                        type="email"
                        autoComplete="email"
                        name="email"
                        label={emailLabel}
                        {...emailTextFieldProps}
                        value={inputFields.email}
                        onChange={handleInputChange}
                    />
                    <FormControl>
                        <InputLabel htmlFor="adornment-password">Password</InputLabel>
                        <Input
                            type={inputFields.showPassword ? 'text' : 'password'}
                            name="password"
                            autoComplete="password"
                            {...passwordTextFieldProps}
                            onChange={handleInputChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="Toggle password visibility"
                                        onClick={handleClickShowPassword}
                                    >
                                        {inputFields.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </form>
            </div>
            <Button {...submitButtonProps}>Submit</Button>
        </Card>
    )
}

export default LoginScreen
