import { AppBar, Link, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { Redirect, RouteComponentProps } from "react-router"
import { classes } from '../../../data.json';
import WithRoot from '../../root';
import SectionLayout from "../../views/SectionLayout";
import Typographic from "../../components/CTypography";
import Toolbar from '../../components/Toolbar';
import AppFooter from "../../views/Footer";

interface RouteParams {
    id: string,
    token?: string
}

const backgroundImages = [
    'https://images.unsplash.com/photo-1613169620329-6785c004d900?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    'https://images.unsplash.com/photo-1611572698227-3f61a040f13d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    'https://images.unsplash.com/photo-1605509407676-36601014de0a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1612192047524-9c90876522b6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1187&q=80',
    'https://images.unsplash.com/photo-1613852706285-4b080230e8db?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    'https://images.unsplash.com/photo-1591931644839-fcbf1c4814ed?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1052&q=80',
];


const backgroundImage = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];


const useStyles = makeStyles((theme: Theme) => ({
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
}));


const useStylesLayout = makeStyles((theme: Theme) => ({
    root: {
        [theme.breakpoints.up('sm')]: {
            height: '100vh',
            minHeight: 800,
            maxHeight: 1300,
        },
    },
}));


function EachClass(props: RouteComponentProps<RouteParams>) {
    const classesStyle = useStyles();
    const classesLayout = useStylesLayout();
    
    const classroom = classes.find(classroom => classroom.token === props.match.params.token);

    if (classroom === undefined) {
        alert("해당 클래스가 존재하지 않습니다.");
        
        return (
            <Redirect path="*" to="/" />
        )
    }
    

    return (
        <>
            <AppBar position="fixed" style={{ background: 'transparent', boxShadow: 'none' }} >
                <Toolbar className={classesStyle.toolbar}> 
                    <Link
                        variant="h3"
                        underline="none"
                        color="inherit"
                        className={classesStyle.title}
                        href="/"
                    >
                        {'JChecker'}
                    </Link>
                </Toolbar>
            </AppBar>
            <SectionLayout backgroundClassName={classesStyle.background} classes={classesLayout}>
                {}
                <img style={{ display : 'none' }} src={backgroundImage} alt="prioirty" />
                <Typographic color="inherit" align="center" variant="h2" marked="center" className={classesStyle.h2}>
                    {classroom.className}
                </Typographic>
                <Typographic color="inherit" align="center" variant="h5" className={classesStyle.h5}>
                    opened by <b>{classroom.instructor}</b> on
                </Typographic>
                
                <Typographic variant="body2" color="inherit" className={classesStyle.more}>
                    with ISEL, HGU.
                </Typographic>
            </SectionLayout>
            <AppFooter />
        </>
    );
}


export default WithRoot(EachClass);