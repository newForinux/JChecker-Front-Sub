import AppBar from '../components/app.component.appbar';
import { createStyles, Link, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import Toolbar, { styles as toolbarStyles } from '../components/app.component.toolbar';


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
        leftLinkActive: {
            color: theme.palette.common.white,
        },
        right: {
            flex: 1,
            display: 'flex',
            justifyContent: 'flex-end',
        },
        rightLink: {
            fontSize: 22,
            color: theme.palette.common.white,
            marginLeft: theme.spacing(3),
        },
    })
);



export default function AppBarView () {
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
                        href="/jchecker/"
                    >
                        {'JChecker'}
                    </Link>

                    <div className={classes.right}>
                        <Link
                            variant="h6"
                            underline="none"
                            className={classes.rightLink}
                            href="/jchecker/sign-in/"
                        >
                            {'로그인'}
                        </Link>
                    </div>
                </Toolbar>
            </AppBar>
            <div className={classes.placeholder} />
        </div>
    );
}