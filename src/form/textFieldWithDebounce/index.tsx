import * as React from 'react'
import TextField, { BaseTextFieldProps, TextFieldProps } from '@material-ui/core/TextField'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { useDebouncedCallback } from 'use-debounce'
import toTitleCase from '../../toTitleCase'

const useStyles = makeStyles((theme: Theme) => createStyles({}))

type IVariant = 'filled' | 'filled' | 'outlined'
interface ITextFieldWIthDebounce extends BaseTextFieldProps {
  value: string | number
  onChange(event: React.ChangeEvent<HTMLInputElement>): void
  debounceTimeout?: number
  variant?: 'filled' | 'filled' | 'outlined'
  titleCase?: boolean
}

const TextFieldWithDebounce: React.FC<ITextFieldWIthDebounce> = textFieldProps => {
  const classes = useStyles(textFieldProps)
  const { value, onChange, debounceTimeout = 300, titleCase, ...props } = textFieldProps
  const [internalValue, setValue] = React.useState<string | number>()
  const [initialValueSet, setInitialValueSet] = React.useState<boolean>(false)

  React.useEffect(() => {
    if (!initialValueSet) {
      setValue(value)
      setInitialValueSet(true)
    }
  }, [initialValueSet, value])

  const debouncedCallback = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event)
    },
    // delay in ms
    debounceTimeout
  )

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist()
    const value = titleCase ? toTitleCase(event.target.value) : event.target.value
    setValue(value)
    debouncedCallback(event)
  }

  /**
   * Hack to make 'props.variant' type safe
   *
   * See: https://github.com/mui-org/material-ui/issues/15697
   */

  const tsProps = (() => {
    let tsVariant
    switch (props.variant) {
      case 'outlined': {
        tsVariant = { variant: 'outlined' as 'outlined' }
        break
      }
      case 'filled': {
        tsVariant = { variant: 'filled' as 'filled' }
        break
      }
      case undefined:
      default: {
        tsVariant = { variant: 'standard' as 'standard' }
        break
      }
    }
    const p = props
    delete p.variant
    return { ...p, ...tsVariant }
  })()

  return (
    <TextField classes={classes} margin="normal" value={internalValue || ''} onChange={handleChange} {...tsProps} />
  )
}

export default TextFieldWithDebounce
