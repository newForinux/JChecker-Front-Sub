import { IconButton, 
    makeStyles, 
    TextField, 
    Theme, 
    Link as MLink, 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    Checkbox, 
    FormControlLabel, 
    DialogActions, 
    Button, 
    DialogContentText, 
    FormControl,
    Grid} from "@material-ui/core";
import StarterMajorLayout from "./SectionLayout";
import Typographic from "../components/CTypography";
import { Link, RouteComponentProps } from "react-router-dom";
import React, { useState } from "react";
import SearchIcon from '@material-ui/icons/Search';
import MemoizedAppbar from './Appbar';
import WithRoot from '../root';
import PolicyDialog from "../components/PolicyDialog";
import Footer from "./Footer";


const backgroundImage = 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80';


interface InfoProps {
    className: string;
    instructor: string;
    token: string;
    direct: boolean;
}



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
    const [open, setOpen] = useState(false);
    const [popen, setPopen] = useState(false);
    const [info, setInfo] = useState({
        className: "",
        instructor: "",
        token: "",
        direct: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    const handleInfoChange = (prop: keyof InfoProps) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setInfo({ ...info, [prop]: e.target.value });
    }

    const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInfo({ ...info, direct: !info.direct });
    }

    const handleGenerate = () => {
        let random =  Math.random().toString(36).substr(2, 11);
        setInfo({ ...info, token: random})
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const handlePOpen = () => {
        setOpen(false);
        setPopen(true);
    }

    const handleClose = () => {
        setOpen(false);
        setInfo({
            className: "",
            instructor: "",
            token: "",
            direct: false,
        });
    }


    return (
        <>
        <MemoizedAppbar />
        <StarterMajorLayout backgroundClassName={classes.background}>
            {}
            <img style={{ display : 'none' }} src={backgroundImage} alt="prioirty" />
            <Typographic color="inherit" align="center" variant="h2" marked="center" className={classes.h2}>
                과제를 만드는 채점자이신가요?
            </Typographic>
            <Typographic color="inherit" align="center" variant="h5" className={classes.h5}>
                <MLink onClick={handleOpen} color="secondary"><b>토큰을 생성해</b></MLink> 클래스를 만들 수 있습니다.<br /><br /><br />
                이미 토큰이 있으신가요?<br />
                토큰을 입력해 클래스를 관리하세요!
            </Typographic>
            <TextField value={value || ""} onChange={handleChange} label="토큰" style={{ margin: 8, borderColor: "white", borderRadius: 4, backgroundColor: "white", width: 500, fontSize: 16 }} 
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
        
        {open &&
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="instructor-token-generator"
            aria-describedby="instructor-token-description"
            maxWidth="sm"
            scroll='paper'
        >
            <DialogTitle id="instructor-token-title">토큰 생성 및 설정</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <b>피드백 즉시 제공</b>을 체크하면 모든 채점 결과를 학생에게 즉시 제공합니다.<br />
                    체크를 해제하면, 결과는 데이터베이스에만 저장되며 학생에게 보여지지 않습니다.
                </DialogContentText>
                <Grid container spacing={2}>
                    <Grid xs={12} item>
                        <FormControl margin="normal">
                            <TextField
                                value={info.className || ""}
                                variant="outlined"
                                label="클래스 네임"
                                size="medium"
                                className="cln"
                                onChange={handleInfoChange("className")}
                            />
                            <TextField
                                value={info.instructor || ""}
                                variant="outlined"
                                label="개설자 이름"
                                size="medium"
                                className="instn"
                                onChange={handleInfoChange("instructor")}
                            />
                        </FormControl>
                    </Grid>
                    <Grid xs={12} item>
                    <Button variant="contained" color="primary" onClick={handleGenerate} disabled={info.className.length < 3 || info.instructor.length < 3}>
                            토큰 생성
                    </Button>
                    </Grid>
                </Grid>
                <Typographic variant="h3" color="inherit">
                    {info.token}
                </Typographic>
                <FormControlLabel
                    control={
                        <Checkbox checked={info.direct}
                                onChange={handleChecked}
                                name="directFeedback"
                                color="primary" />}
                                label="피드백 즉시 제공"
                        />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    닫기
                </Button>
                <Button onClick={handlePOpen} color="primary">
                    확인
                </Button>
            </DialogActions>
        </Dialog>
        }
        {popen &&
            <PolicyDialog state={popen} token={info.token} isDirect={info.direct}/>
        }
            <Footer />
        </>
    );
}


export default WithRoot(PreClasses);