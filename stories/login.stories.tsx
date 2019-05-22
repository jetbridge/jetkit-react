import * as React from 'react'
import { storiesOf } from '@storybook/react'
import LoginScreen from '../src/LoginScreen/'
import centered from '@storybook/addon-centered/react'

storiesOf('Login', module)
    .addDecorator(centered)
    .add('Loginscreen', () => {
        return <LoginScreen onSubmitClick={() => console.log('test')} />
    })
