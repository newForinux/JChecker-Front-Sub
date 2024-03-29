import { AppBar, Link, makeStyles, Button } from "@material-ui/core";
import React from "react";
import WithRoot from '../../root';
import SectionLayout from "../../views/SectionLayout";
import Typographic from "../Typographic";
import Toolbar from '../Toolbar';
import AppFooter from "../../views/Footer";
import PlaylistAddCheckRoundedIcon from '@material-ui/icons/PlaylistAddCheckRounded';
import { useTranslation } from "react-i18next";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

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
        marginBottom: theme.spacing(4),
    },
    h5: {
        marginBottom: theme.spacing(4),
        marginTop: theme.spacing(4),
        [theme.breakpoints.up('sm')]: {
            marginTop: theme.spacing(10),
        },
        fontFamily: 'JSDongkang-Regular',
    },
    h6: {
        fontFamily: 'JSDongkang-Regular',
        textAlign: 'left',
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
    goback: {
        marginTop: theme.spacing(5),
    }
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
    const { t } = useTranslation();

    if (props.location.state === undefined) {
        props.history.push('/jchecker/error');
        return null;
    } 
    
    else {

    const results = props.location.state.detail;

    const isPassed = {
        feedback: results.isDirect === 'true' ? true : false,
        count: results.count !== undefined ? (results.count.deductedPoint === 0 ? true : false) : undefined,
        compiled: results.compile !== undefined ? (results.compile.deductedPoint === 0 ? true : false) : undefined,
        inputs: results.runtimeCompare !== undefined ? (results.runtimeCompare.deductedPoint === 0 ? true : false) : undefined,
        classes: results.classes !== undefined ? (results.classes.deductedPoint === 0 ? true : false) : undefined,
        packages: results.packages !== undefined ? (results.packages.deductedPoint === 0 ? true : false) : undefined,
        custexc: results.customException !== undefined ? (results.customException.deductedPoint === 0 ? true : false) : undefined,
        custstr: results.customStructure !== undefined ? (results.customStructure.deductedPoint === 0 ? true : false) : undefined,
        interfaces: results.inheritInterface !== undefined ? (results.inheritInterface.deductedPoint === 0 ? true : false) : undefined,
        superclass: results.inheritSuper !== undefined ? (results.inheritSuper.deductedPoint === 0 ? true : false) : undefined,
        overriding: results.overriding !== undefined ? (results.overriding.deductedPoint === 0 ? true : false) : undefined,
        overloading: results.overloading !== undefined ? (results.overloading.deductedPoint === 0 ? true : false) : undefined,
        thread: results.thread !== undefined ? (results.thread.deductedPoint === 0 ? true : false) : undefined,
        javadoc: results.javadoc !== undefined ? (results.javadoc.deductedPoint === 0 ? true : false) : undefined,
        encapsulation: results.encapsulation !== undefined ? (results.encapsulation.deductedPoint === 0 ? true : false) : undefined,
    };

    
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
                    { results.studentNum } _ {t('result.score.success')}
                </Typographic>

                {isPassed.feedback &&
                    <Typographic color="inherit" align="center" variant="h3" >
                        {isPassed.feedback}
                        { results.result } / { results.point }
                    </Typographic>
                }

                
                {isPassed.feedback && isPassed.count === false &&
                    <Typographic color="inherit" align="left" variant="subtitle1" className={classesStyle.h6}>
                        <PlaylistAddCheckRoundedIcon color="error" /> &nbsp;
                        (-{results.count.deductedPoint}) {t('result.score.count')}
                    </Typographic>
                }


                {isPassed.feedback && isPassed.classes === false &&
                    <Typographic color="inherit" align="left" variant="subtitle1" className={classesStyle.h6}>
                        <PlaylistAddCheckRoundedIcon color="error" /> &nbsp;
                        (-{results.classes.deductedPoint}) {t('result.score.class')}
                    </Typographic>
                }


                {isPassed.feedback && isPassed.compiled === false &&
                    <Typographic color="inherit" align="left" variant="subtitle1" className={classesStyle.h6}>
                        <PlaylistAddCheckRoundedIcon color="error" /> &nbsp;
                        (-{results.compile.deductedPoint}) {t('result.score.compile')}
                    </Typographic>
                }

                {isPassed.feedback && isPassed.inputs === false &&
                    <Typographic color="inherit" align="left" variant="subtitle1" className={classesStyle.h6}>
                        <PlaylistAddCheckRoundedIcon color="error" /> &nbsp;
                        (-{results.runtimeCompare.deductedPoint}) {t('result.score.testcase')}
                    </Typographic>
                }

                {isPassed.feedback && isPassed.packages === false &&
                    <Typographic color="inherit" align="left" variant="subtitle1" className={classesStyle.h6}>
                        <PlaylistAddCheckRoundedIcon color="error" /> &nbsp;
                        (-{results.packages.deductedPoint}) {t('result.score.package')}
                    </Typographic>
                }

                {isPassed.feedback && isPassed.custexc === false &&
                    <Typographic color="inherit" align="left" variant="subtitle1" className={classesStyle.h6}>
                        <PlaylistAddCheckRoundedIcon color="error" /> &nbsp;
                        (-{results.customException.deductedPoint}) {t('result.score.customexc')}
                    </Typographic>
                }

                {isPassed.feedback && isPassed.custstr === false &&
                    <Typographic color="inherit" align="left" variant="subtitle1" className={classesStyle.h6}>
                        <PlaylistAddCheckRoundedIcon color="error" /> &nbsp;
                        (-{results.customStructure.deductedPoint}) {t('result.score.customstr')}
                    </Typographic>
                }

                {isPassed.feedback && isPassed.interfaces === false &&
                    <Typographic color="inherit" align="left" variant="subtitle1" className={classesStyle.h6}>
                        <PlaylistAddCheckRoundedIcon color="error" /> &nbsp;
                        (-{results.inheritInterface.deductedPoint}) {t('result.score.interface')}
                    </Typographic>
                }

                {isPassed.feedback && isPassed.superclass === false &&
                    <Typographic color="inherit" align="left" variant="subtitle1" className={classesStyle.h6}>
                        <PlaylistAddCheckRoundedIcon color="error" /> &nbsp;
                        (-{results.inheritSuper.deductedPoint}) {t('result.score.superclass')}
                    </Typographic>
                }

                {isPassed.feedback && isPassed.overriding === false &&
                    <Typographic color="inherit" align="left" variant="subtitle1" className={classesStyle.h6}>
                        <PlaylistAddCheckRoundedIcon color="error" /> &nbsp;
                        (-{results.overriding.deductedPoint}) {t('result.score.overriding')}
                    </Typographic>
                }

                {isPassed.feedback && isPassed.overloading === false &&
                    <Typographic color="inherit" align="left" variant="subtitle1" className={classesStyle.h6}>
                        <PlaylistAddCheckRoundedIcon color="error" /> &nbsp;
                        (-{results.overloading.deductedPoint}) {t('result.score.overloading')}
                    </Typographic>
                }


                {isPassed.feedback && isPassed.thread === false &&
                    <Typographic color="inherit" align="left" variant="subtitle1" className={classesStyle.h6}>
                        <PlaylistAddCheckRoundedIcon color="error" /> &nbsp;
                        (-{results.thread.deductedPoint}) {t('result.score.thread')}
                    </Typographic>
                }   
                

                {isPassed.feedback && isPassed.javadoc === false &&
                    <Typographic color="inherit" align="left" variant="subtitle1" className={classesStyle.h6}>
                        <PlaylistAddCheckRoundedIcon color="error" /> &nbsp;
                        (-{results.javadoc.deductedPoint}) {t('result.score.javadoc')}
                    </Typographic>
                }


                {isPassed.feedback && isPassed.encapsulation === false &&
                    <Typographic color="inherit" align="left" variant="subtitle1" className={classesStyle.h6}>
                        <PlaylistAddCheckRoundedIcon color="error" /> &nbsp;
                        (-{results.encapsulation.deductedPoint}) {t('result.score.encap')}
                    </Typographic>
                }

                <Button 
                    variant="contained" 
                    color="secondary" 
                    size="large" 
                    startIcon={<ArrowBackIosIcon />} 
                    onClick={() => props.history.goBack()}
                    className={classesStyle.goback}
                >
                    Back
                </Button>
                
            </SectionLayout>
            <AppFooter />
        </>
        
    )};
}


export default React.memo(WithRoot(ResultProcess));