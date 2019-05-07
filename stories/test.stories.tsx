import * as React from 'react'
import { storiesOf } from '@storybook/react'
import App from '../src/App'

storiesOf('AppStory', module).add('Authorise', () => {
    return <App />
})
