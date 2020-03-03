import * as React from 'react'
import * as ReactDOM from 'react-dom'
import LoginScreen from '.'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<LoginScreen onSubmitClick={() => null} />, div)
  ReactDOM.unmountComponentAtNode(div)
})
