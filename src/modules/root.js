import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import theme from './theme';

export default function root(Component) {
    function WithRoot(props) {
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Component {...props} />
            </ThemeProvider>
        );
    }

    return WithRoot;
}