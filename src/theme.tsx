import * as React from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

const primaryFont = ['rawline', 'Raleway', 'sans-serif'].join(',')

const primaryLightColor = '#354A72'
const darkContrastTextColor = '#e1e1e1'

declare module '@material-ui/core/styles/createMuiTheme' {
    interface Theme {
        navWidth: number
    }

    interface ThemeOptions {
        navWidth: number
    }
}
// All the following keys are optional.
// We try our best to provide a great default value.
const theme = createMuiTheme({
    palette: {
        primary: {
            contrastText: darkContrastTextColor,
            main: '#22365B',
            light: '#334567',
            dark: '#142344',
        },
        secondary: {
            // contrastText: darkContrastTextColor,
            main: '#7BB1C0',
            light: '#6ba3b2',
            dark: '#af4e3b',
        },
        background: { default: '#f5f5f5', paper: 'white' },
    },
    typography: {
        useNextVariants: true,
        fontFamily: primaryFont,
    },
    navWidth: 270,
})

const withTheme = <P extends object>(Component: React.ComponentType<P>) =>
    class withTheme extends React.Component<P> {
        render() {
            return (
                <MuiThemeProvider theme={theme}>
                    <link href="https://s3-us-west-2.amazonaws.com/jb-services.com/rawline.css" rel="stylesheet" />
                    <link
                        href="https://fonts.googleapis.com/css?family=Raleway:200,300,400,500,600,700,900"
                        rel="stylesheet"
                    />
                    <Component {...this.props} />
                </MuiThemeProvider>
            )
        }
    }

export default withTheme
