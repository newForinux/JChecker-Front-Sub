import { Theme, withStyles, WithStyles } from "@material-ui/core";
import React from "react";
import StarterMajorLayout from "./app.component.view.started.layout";
import Typographic from "../components/app.component.typography";
import Button from "../components/app.component.button";
import SelectCond from "../components/app.component.cond";


const backgroundImage = 'https://images.unsplash.com/photo-1584907797015-7554cd315667?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1055&q=80';

interface Props extends WithStyles<typeof styles> {}


const styles = (theme: Theme) => ({
    background: {
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#9d9c97',
        backgroundPosition: 'center',
    },
    button: {
        minWidth: 200,
    },
    h5: {
        marginBottom: theme.spacing(4),
        marginTop: theme.spacing(4),
        [theme.breakpoints.up('sm')]: {
            marginTop: theme.spacing(10),
        },
    },
    more: {
        marginTop: theme.spacing(2),
    },
});


function StarterMajor(props: Props) {
    const { classes } = props;

    return (
        <StarterMajorLayout backgroundClassName={classes.background}>
            {}
            <img style={{ display : 'none' }} src={backgroundImage} alt="prioirty" />
            <Typographic color="inherit" align="center" variant="h2" marked="center">
                Judge your Assignments
            </Typographic>
            <Typographic color="inherit" align="center" variant="h5" className={classes.h5}>
                Auto-judge your Java-programming assignmnet.
            </Typographic>
            <Button
                color="secondary"
                variant="contained"
                size="large"
                className={classes.button}
                href="/jchecker/sign-in/"
            >
                시작하기
            </Button>
            <SelectCond />

        </StarterMajorLayout>
        
    );
}


export default withStyles(styles)(StarterMajor);