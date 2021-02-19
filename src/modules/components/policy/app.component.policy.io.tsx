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
    keepMounted: boolean;
    open: boolean;
    onCreate: Function;
}


export default function InputDialog(props: InputDialogRawProps) {
    const classes = style();
    const { open: isOpen } = props;
    
    const [open, setOpen] = useState(isOpen);
    const [fields, setFields] = useState(["io-0"]);
    const [outputData, setOutputData] = useState([""]);
    const [inputData, setInputData] = useState([""]);
    const [deduct, setDeduct] = useState(0);
    const [max_deduct, setMax_deduct] = useState(0);
    const [resIO, setResIO] = useState({
        state: false,
        input: [] as string[],
        output: [] as string[],
        deductPoint : 0,
        maxDeduct: 0
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
        }

    },[isOpen]);


    useEffect(() => {
        console.log(resIO);
        props.onCreate("runtimeCompare", resIO);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[resIO]);

    
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


    const handleClose = () => {
        setResIO({
            state: false,
            input: [],
            output: [],
            deductPoint : 0,
            maxDeduct: 0
        })
        setOpen(false);
    }


    const handleResIO = () => {
        setResIO({
            state: true,
            input: inputData,
            output: outputData,
            deductPoint : deduct,
            maxDeduct: max_deduct
        })
        setOpen(false);
    }


    return (
        <Dialog 
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-io"
                maxWidth="md"
                fullWidth={true}
                scroll='paper'
                disableEscapeKeyDown
        >
        <DialogTitle id="form-dialog-io">테스트 케이스</DialogTitle>
        <DialogContent dividers>
            <DialogContentText>
                제출 코드를 실행하면서 검사할 케이스를 추가합니다.
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
                <Grid container spacing={1} key={index}>
                    <Grid xs item>
                        <FormControl fullWidth margin="normal">
                            <TextField
                                value={inputData[index] || ""}
                                variant="outlined"
                                id={"in-" + index}
                                label="입력값"
                                name={"in-" + index}
                                className="io"
                                multiline
                                onChange={handleInputChange(index)}
                            />
                        </FormControl>
                    </Grid>
                    <Grid xs item>
                        <FormControl fullWidth margin="normal">
                            <TextField
                                value={outputData[index] || ""}
                                variant="outlined"
                                id={"out-" + index}
                                label="출력값"
                                name={"out-" + index}
                                className="oi"
                                multiline
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
                        완료
                </Button>
            </DialogActions>
        </Dialog>
    );
}