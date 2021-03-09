import AppBar from '../components/AppbarLayout';
import { createStyles, Link, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import Toolbar, { styles as toolbarStyles } from '../components/Toolbar';

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        title: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        placeholder: toolbarStyles(theme).root,
        toolbar: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        left: {
            flex: 1,
        },
        logo: {
            marginTop: theme.spacing(1),
            maxWidth: "300px",
        }
    })
);



function AppBarView () {
    const classes = useStyles();

    return (
        <div>
            <AppBar position="fixed">
                <Toolbar className={classes.toolbar}>
                    <div className={classes.left} />
                    <Link
                        variant="h3"
                        underline="none"
                        color="inherit"
                        className={classes.title}
                        href="/"
                    >
                        <img src="/static/logo.png" alt="logo" className={classes.logo} />

                    </Link>
                </Toolbar>
            </AppBar>
            <div className={classes.placeholder} />
        </div>
    );
}


export default React.memo(AppBarView);