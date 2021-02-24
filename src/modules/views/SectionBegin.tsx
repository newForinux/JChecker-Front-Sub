import { Link, Theme, withStyles, WithStyles} from "@material-ui/core";
import SectionLayout from './SectionLayout';
import Typographic from '../components/CTypography';
import React from "react";

const backgroundImage = 'https://images.unsplash.com/photo-1517512006864-7edc3b933137?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80';


interface Props extends WithStyles<typeof styles> {
    id?: string;
}


const styles = (theme: Theme) => ({
    background: {
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#1e1520',
        backgroundPosition: 'center',
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


function SectionBegin(props: Props) {
    const { classes } = props;

    return (
        <SectionLayout backgroundClassName={classes.background}>
            <img style={{ display: 'none' }} src={backgroundImage} alt="priority" />
            <Typographic color="inherit" align="center" variant="h1" marked="center">
                지금 시작하세요.
            </Typographic>
            <Typographic color="inherit" align="center" variant="h5" className={classes.h5}>
                <Link href="/classes" color="secondary">
                    인증 토큰을 입력해
                </Link>
                    &nbsp;현재 열린 클래스에 입장합니다.<br /><br />
                클래스를 운영하고 싶으신가요? &nbsp;
                <Link href="/instructors" color="secondary">
                    인증 토큰을 발행
                </Link>
                할 수 있습니다.
            </Typographic>
        </SectionLayout>
    )
}


export default withStyles(styles)(SectionBegin);