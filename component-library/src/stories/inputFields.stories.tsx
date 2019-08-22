import * as React from 'react'
import { storiesOf } from '@storybook/react'
import TextFieldWithDebounce from '../../../src/TextFieldWithDebounce'

storiesOf('Input Fields', module).add('TextFieldWithDebounce', () =>
  React.createElement(() => {
    const [value] = React.useState('test')
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      console.debug(event.target.value)
    }
    return (
      <div style={{ width: 500 }}>
        <TextFieldWithDebounce debounceTimeout={1000} onChange={handleChange} value={value} />
      </div>
    )
  })
)
