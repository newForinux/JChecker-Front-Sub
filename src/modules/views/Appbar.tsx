import AppBar from '../components/AppbarLayout';
import { createStyles, Link, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import Toolbar, { styles as toolbarStyles } from '../components/Toolbar';


const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        title: {
            fontSize: 42,
            letterSpacing: 7,
        },
        placeholder: toolbarStyles(theme).root,
        toolbar: {
            justifyContent: 'space-between',
        },
        left: {
            flex: 1,
        },
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
                        {'JChecker'}
                    </Link>
                </Toolbar>
            </AppBar>
            <div className={classes.placeholder} />
        </div>
    );
}


export default React.memo(AppBarView);