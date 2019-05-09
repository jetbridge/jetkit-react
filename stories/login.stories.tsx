import * as React from 'react'
import { storiesOf } from '@storybook/react'
import LoginScreen from '../src/components/login/index'

storiesOf('Login', module).add('Loginscreen', () => {
    return <LoginScreen />
})
