import * as React from 'react'
import TextField, { BaseTextFieldProps } from '@material-ui/core/TextField'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { useDebouncedCallback } from 'use-debounce'

const useStyles = makeStyles((theme: Theme) => createStyles({}))

interface ITextFieldWIthDebounce extends BaseTextFieldProps {
  value: string | number
  onChange(event: React.ChangeEvent<HTMLInputElement>): void
  debounceTimeout?: number
}

const TextFieldWithDebounce: React.FC<ITextFieldWIthDebounce> = textFieldProps => {
  const classes = useStyles(textFieldProps)
  const { value, onChange, debounceTimeout = 300, variant, ...props } = textFieldProps
  const [internalValue, setValue] = React.useState<unknown>()
  const [initialValueSet, setInitialValueSet] = React.useState<boolean>(false)

  React.useEffect(() => {
    if (!initialValueSet) {
      setValue(value)
      setInitialValueSet(true)
    }
  }, [initialValueSet, value])

  const [debouncedCallback] = useDebouncedCallback(
    value => {
      onChange(value)
    },
    // delay in ms
    debounceTimeout
  )

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setValue(value)
    debouncedCallback(value)
  }

  return (
    <TextField
      classes={classes}
      margin="normal"
      variant="outlined"
      value={internalValue || ''}
      onChange={handleChange}
      {...props}
    />
  )
}

export default TextFieldWithDebounce
