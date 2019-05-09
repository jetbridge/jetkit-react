import * as React from 'react'
import { storiesOf } from '@storybook/react'
import LoginScreen from '../src/components/login/index'
import centered from '@storybook/addon-centered/react'

storiesOf('Login', module)
    .addDecorator(centered)
    .add('Loginscreen', () => {
        return <LoginScreen />
    })
