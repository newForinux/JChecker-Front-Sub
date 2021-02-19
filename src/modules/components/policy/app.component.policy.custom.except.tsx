import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, makeStyles, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react"
import AddIcon from '@material-ui/icons/Add';


const style = makeStyles({
    buttonRight: {
        float: 'right',
        position: 'relative',
    }
});


export interface ExceptionDialogRawProps {
    keepMounted: boolean;
    open: boolean;
    onCreate: Function;
}


export default function ExceptionDialog(props: ExceptionDialogRawProps) {
    const classes = style();
    const { open: isOpen } = props;
    
    const [open, setOpen] = useState(isOpen);
    const [fields, setFields] = useState(["cec-0"]);
    const [required, setRequired] = useState([""]);
    const [deduct, setDeduct] = useState(0);
    const [max_deduct, setMax_deduct] = useState(0);
    const [resCec, setResCec] = useState({
        state: false,
        required: [] as string[],
        deductPoint : 0,
        maxDeduct: 0
    });


    const appendFields = () => {
        let element = `cec-${fields.length}`;
        setFields(fields => fields.concat([element]));
    }


    const handleOpen = () => {
        setOpen(true);
    }


    useEffect(() => {
        if (isOpen) {
            handleOpen();
        }

    },[isOpen]);


    useEffect(() => {
        console.log(resCec);
        props.onCreate("customException", resCec);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[resCec]);


    
    const handleRequiredChange = (index : number) => (e : React.ChangeEvent<HTMLInputElement>) => {
        let newArr = [...required];
        newArr[index] = e.target.value;
        setRequired(newArr);
    }
    

    const handleClose = () => {
        setResCec({
            state: false,
            required: [],
            deductPoint : 0,
            maxDeduct: 0
        });
        setOpen(false);
    }


    const handleResIO = () => {
        setResCec({
            state: true,
            required: required,
            deductPoint : deduct,
            maxDeduct: max_deduct
        });
        setOpen(false);
    }

  

    return (
        <Dialog 
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-cec"
                maxWidth="sm"
                fullWidth={true}
                scroll='paper'
                disableEscapeKeyDown
        >
        <DialogTitle id="form-dialog-cec">사용자 정의 예외처리 클래스</DialogTitle>
        <DialogContent dividers>
            <DialogContentText>
                사용자가 직접 정의한 예외 처리 클래스가 필요한가요?
                <Button variant="outlined" onClick={() => appendFields()} startIcon={<AddIcon />} className={classes.buttonRight}>추가</Button>
            </DialogContentText>

            <Grid container spacing={2}>
                <Grid item>   
                    <TextField
                        type="number"
                        value={deduct}
                        label="각 항목 당 감점할 점수"
                        size="small"
                        margin="dense"
                        onChange={e => setDeduct(parseFloat(e.target.value) || deduct)}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        type="number"
                        value={max_deduct}
                        label="최대 감점 점수"
                        size="small"
                        margin="dense"
                        onChange={e => setMax_deduct(parseFloat(e.target.value) || max_deduct)}
                    />
                </Grid>
            </Grid>

            {fields.map((input, index) => (
                <Grid xs={12} container spacing={1} item key={index}>
                    <Grid xs={12} item>
                        <FormControl fullWidth margin="normal">
                            <TextField
                                value={required[index] || ""}
                                variant="outlined"
                                id={"cec-" + index}
                                label="사용자 클래스 네임"
                                name={"cec-" + index}
                                size="medium"
                                className="cec"
                                onChange={handleRequiredChange(index)}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
            ))}
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} color="primary">
                        닫기
                </Button>
                <Button onClick={handleResIO} color="primary">
                        완료
                </Button>
            </DialogActions>
        </Dialog>
    );
}