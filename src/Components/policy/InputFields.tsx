import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, makeStyles, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react"
import AddIcon from '@material-ui/icons/Add';


const style = makeStyles({
    buttonRight: {
        float: 'right',
        position: 'relative',
    }
});


export interface InputDialogRawProps {
    id: string;
    keepMounted: boolean;
    open: boolean;
}


export default function InputDialogRaw(props: InputDialogRawProps) {
    const classes = style();
    const { open: isOpen } = props;
    
    const [open, setOpen] = useState(isOpen);
    const [fields, setFields] = useState(["io-0"]);
    const [outputData, setOutputData] = useState([""]);
    const [inputData, setInputData] = useState([""]);
    const [resIO, setResIO] = useState({
        input: [] as string[],
        output: [] as string[]
    });


    const appendFields = () => {
        let element = `io-${fields.length}`;
        setFields(fields => fields.concat([element]));
    }


    const handleOpen = () => {
        setOpen(true);
    }


    useEffect(() => {
        if (isOpen) {
            handleOpen();
            console.log(isOpen);
        }

        if (resIO.input.length > 0 && resIO.output.length > 0)
            console.log(resIO);
    },[isOpen, resIO]);


    const handleClose = () => {
        setOpen(false);
    }

    
    const handleInputChange = (index : number) => (e : React.ChangeEvent<HTMLInputElement>) => {
        let newArr = [...inputData];
        newArr[index] = e.target.value;
        setInputData(newArr);
    }
    

    const handleOutputChange = (index : number) => (e : React.ChangeEvent<HTMLInputElement>) => {
        let newArr = [...outputData];
        newArr[index] = e.target.value;
        setOutputData(newArr);
    }


    const handleResIO = () => {
        setResIO({
            input: inputData,
            output: outputData
        })
        setOpen(false);
    }


    return (
        <Dialog 
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-io"
                maxWidth="md"
                scroll='paper'
                disableEscapeKeyDown
                disableBackdropClick
        >
        <DialogTitle id="form-dialog-io">테스트 케이스</DialogTitle>
        <DialogContent dividers>
            <DialogContentText>
                제출 코드를 실행하면서 검사할 케이스를 추가합니다.
                <Button variant="outlined" onClick={() => appendFields()} startIcon={<AddIcon />} className={classes.buttonRight}>추가</Button>
            </DialogContentText>
                {fields.map((input, index) => (
                    <Grid xs={12} container spacing={1} item key={index}>
                        <Grid xs={6} item>
                            <FormControl margin="normal">
                                <TextField
                                    value={inputData[index] || ""}
                                    variant="outlined"
                                    id={"in-" + index}
                                    label="입력값"
                                    name={"in-" + index}
                                    size="medium"
                                    className="io"
                                    onChange={handleInputChange(index)}
                                />
                            </FormControl>
                        </Grid>
                        <Grid xs={6} item>
                            <FormControl margin="normal">
                                <TextField
                                    value={outputData[index] || ""}
                                    variant="outlined"
                                    id={"out-" + index}
                                    label="출력값"
                                    name={"out-" + index}
                                    size="medium"
                                    className="oi"
                                    onChange={handleOutputChange(index)}
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
                        제출
                </Button>
            </DialogActions>
        </Dialog>
    );
}