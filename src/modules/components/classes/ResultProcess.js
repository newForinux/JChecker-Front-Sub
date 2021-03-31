import { AppBar, Link, makeStyles } from "@material-ui/core";
import React from "react";
import WithRoot from '../../root';
import SectionLayout from "../../views/SectionLayout";
import Typographic from "../CTypography";
import Toolbar from '../Toolbar';
import AppFooter from "../../views/Footer";




const backgroundImage = "https://images.unsplash.com/photo-1505279340786-1e3b097e227a?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=967&q=80";

const useStyles = makeStyles((theme) => ({
    background: {
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#5d5447',
        backgroundPosition: 'center',
    },
    button: {
        minWidth: 125,
    },
    h2: {
        fontFamily: 'ELAND_Choice_M',
    },
    h5: {
        marginBottom: theme.spacing(4),
        marginTop: theme.spacing(4),
        [theme.breakpoints.up('sm')]: {
            marginTop: theme.spacing(10),
        },
        fontFamily: 'JSDongkang-Regular',
    },
    more: {
        marginTop: theme.spacing(2),
    },
    title: {
        fontSize: 42,
        letterSpacing: 7,
    },
    toolbar: {
        justifyContent: 'space-between',
    },
    logo: {
        marginTop: theme.spacing(1),
        maxWidth: "300px",
    },
}));


const useStylesLayout = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.up('sm')]: {
            height: '100vh',
            minHeight: 800,
            maxHeight: 1300,
        },
    },
}));


function ResultProcess (props) {
    const classesStyle = useStyles();
    const classesLayout = useStylesLayout();
    
    if (props.location.state === undefined) {
        props.history.push('/jchecker/error');
        return null;
    } 
    
    else {
    return (
        <>
            <AppBar position="fixed" style={{ background: 'transparent', boxShadow: 'none' }} >
                <Toolbar className={classesStyle.toolbar}> 
                    <Link
                        variant="h3"
                        underline="none"
                        color="inherit"
                        className={classesStyle.title}
                        href="/jchecker"
                        
                    >
                        <img src="/assets/logo.png" alt="logo" className={classesStyle.logo} />
                    </Link>
                </Toolbar>
            </AppBar>
            <SectionLayout backgroundClassName={classesStyle.background} classes={classesLayout}>
                {}
                <img style={{ display : 'none' }} src={backgroundImage} alt="prioirty" />
                <Typographic color="inherit" align="center" variant="h2" marked="center" className={classesStyle.h2}>
                    {props.location.state.detail.result} / {props.location.state.detail.point}
                </Typographic>
            </SectionLayout>
            <AppFooter />
        </>
        
    )};
}


export default React.memo(WithRoot(ResultProcess));