import { IconButton, makeStyles, TextField, Theme } from "@material-ui/core";
import StarterMajorLayout from "./SectionLayout";
import Typographic from "../components/CTypography";
import { Link, RouteComponentProps } from "react-router-dom";
import React, { useState } from "react";
import SearchIcon from '@material-ui/icons/Search';
import AppbarView from './Appbar';
import WithRoot from '../root';
import AppFooter from "./Footer";


const backgroundImage = 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80';


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
    textField: {
        background: 'white',
    },
    resize: {
        fontSize: 20,
    },
}));



function PreClasses (props: RouteComponentProps) {
    const classes = useStyles();
    const [value, setValue] = useState("");


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }


    return (
        <>
        <AppbarView />
        <StarterMajorLayout backgroundClassName={classes.background}>
            {}
            <img style={{ display : 'none' }} src={backgroundImage} alt="prioirty" />
            <Typographic color="inherit" align="center" variant="h2" marked="center" className={classes.h2}>
                클래스 토큰
            </Typographic>
            <Typographic color="inherit" align="center" variant="h5" className={classes.h5}>
                미리 받은 클래스 토큰을 이용해 강의실에 입장합니다.
            </Typographic>
            <TextField value={value || ""} onChange={handleChange} label="토큰" style={{ margin: 8, borderColor: "white", borderRadius: 4, backgroundColor: "white", width: 500 }} 
                placeholder="클래스 토큰을 입력하세요" margin="normal" variant="outlined" InputProps={{
                    classes: {
                        input: classes.resize,
                    },
                    endAdornment: (
                        <Link to={`${props.match.url}/${value}`}>
                            <IconButton aria-label="token inputs" edge="end">
                                <SearchIcon />
                            </IconButton>
                        </Link>
                    )
                }} />
            <Typographic variant="body2" color="inherit" className={classes.more}>
                with ISEL, HGU.
            </Typographic>
        </StarterMajorLayout>
        <AppFooter />
        </>
    );
}


export default React.memo(WithRoot(PreClasses));