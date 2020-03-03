import * as React from 'react'
import { storiesOf } from '@storybook/react'
import TextFieldWithDebounce from '../../../src/form/textFieldWithDebounce/index'

storiesOf('Input Fields', module)
  .add('TextFieldWithDebounce', () =>
    React.createElement(() => {
      const [value] = React.useState('test')
      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.debug(event.target.value)
      }
      return (
        <div style={{ width: 500 }}>
          <TextFieldWithDebounce debounceTimeout={1000} variant="outlined" onChange={handleChange} value={value} />
        </div>
      )
    })
  )
  .add('capitalized input fields', () =>
    React.createElement(() => {
      const [value] = React.useState('test')
      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.debug(event.target.value)
      }
      return (
        <div style={{ width: 500 }}>
          <TextFieldWithDebounce debounceTimeout={1000} variant="outlined" onChange={handleChange} value={value} />
        </div>
      )
    })
  )
