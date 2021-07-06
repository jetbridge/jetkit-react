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
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles'
import { Variant } from '@material-ui/core/styles/createTypography'

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
})
interface ILoginScreenProps extends WithStyles<typeof styles> {
  title?: string
  titleStyle?: React.CSSProperties
  showTitle?: boolean
  inputFieldWrapperStyle?: React.CSSProperties
  emailTextFieldProps?: TextFieldProps
  passwordTextFieldProps?: InputProps
  emailLabel?: string
  passwordLabel?: string
  userEmail?: string
  onInputChange?({
    event,
    key,
  }: {
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    key: 'email' | 'password'
  }): void
  emailError?: boolean
  emailHelperText?: string
  passwordError?: boolean
  passwordHelperText?: string
  submitButtonProps?: ButtonProps
  titleVariant?: Variant
  onSubmitClick(): void
}

interface LoginScreenState {
  email: string
  password: string
  showPassword: boolean
}

const LoginScreen: React.FunctionComponent<ILoginScreenProps> = ({
  title = 'Login',
  showTitle = true,
  emailTextFieldProps,
  passwordTextFieldProps,
  emailLabel = 'Email',
  userEmail = '',
  onInputChange,
  submitButtonProps,
  classes,
  titleVariant = 'h3',
  onSubmitClick,
}) => {
  const [inputFields, setInputValues] = React.useState({
    email: userEmail,
    password: '',
    showPassword: false,
  })

  const handleInputChange = (key: 'email' | 'password') => (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist() // to avoid React optimizations which can make event.target = null
    setInputValues(prevState => ({
      ...prevState,
      [key]: event.target.value,
    }))
    if (onInputChange) onInputChange({ event, key })
  }

  const handleClickShowPassword = () => {
    setInputValues({ ...inputFields, showPassword: !inputFields.showPassword })
  }

  return (
    <Card className={classes.root}>
      <div className={classes.innerWrapper}>
        <div className={classes.titleAndInputWrapper}>
          {showTitle && (
            <Typography variant={titleVariant} className={classes.title}>
              {title}
            </Typography>
          )}
          <form className={classes.inputWrapperStyle}>
            <TextField
              type="email"
              inputProps={{
                'data-testid': 'email',
              }}
              autoComplete="email"
              className={`${classes.inputField} ${classes.emailInputField}`}
              label={emailLabel}
              {...emailTextFieldProps}
              value={inputFields.email}
              onChange={handleInputChange('email')}
            />
            <FormControl className={`${classes.inputField} ${classes.passwordInputField}`}>
              <InputLabel htmlFor="adornment-password">Password</InputLabel>
              <Input
                inputProps={{
                  'data-testid': 'password',
                }}
                type={inputFields.showPassword ? 'text' : 'password'}
                autoComplete="password"
                {...passwordTextFieldProps}
                onChange={handleInputChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton aria-label="Toggle password visibility" onClick={handleClickShowPassword}>
                      {inputFields.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </form>
        </div>
      </div>
      <Button
        disabled={!inputFields.email || !inputFields.password}
        className={classes.submitButton}
        onClick={onSubmitClick}
        {...submitButtonProps}
      >
        Submit
      </Button>
    </Card>
  )
}

export default withStyles(styles)(LoginScreen)
