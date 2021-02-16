import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, makeStyles, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react"
import AddIcon from '@material-ui/icons/Add';


const style = makeStyles({
    buttonRight: {
        float: 'right',
        position: 'relative',
    }
});


export interface InterfaceDialogRawProps {
    keepMounted: boolean;
    open: boolean;
    onCreate: Function;
}


export default function InterfaceDialog(props: InterfaceDialogRawProps) {
    const classes = style();
    const { open: isOpen } = props;
    
    const [open, setOpen] = useState(isOpen);
    const [fields, setFields] = useState(["itf-0"]);
    const [required, setRequired] = useState([""]);
    const [resItf, setResItf] = useState({
        state: false,
        required: [] as string[],
    });


    const appendFields = () => {
        let element = `itf-${fields.length}`;
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
        console.log(resItf);
        props.onCreate("inheritInterface", resItf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[resItf]);


    const handleRequiredChange = (index : number) => (e : React.ChangeEvent<HTMLInputElement>) => {
        let newArr = [...required];
        newArr[index] = e.target.value;
        setRequired(newArr);
    }


    const handleClose = () => {
        setResItf({
            state: false,
            required: []
        });
        setOpen(false);
    }
    

    const handleResIO = () => {
        setResItf({
            state: true,
            required: required
        });
        setOpen(false);
    }



    return (
        <Dialog 
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-itf"
                maxWidth="md"
                scroll='paper'
                disableEscapeKeyDown
                disableBackdropClick
        >
        <DialogTitle id="form-dialog-itf">인터페이스 상속 여부</DialogTitle>
        <DialogContent dividers>
            <DialogContentText>
                인터페이스의 상속 여부를 판단합니다.
                <Button variant="outlined" onClick={() => appendFields()} startIcon={<AddIcon />} className={classes.buttonRight}>추가</Button>
            </DialogContentText>
                {fields.map((input, index) => (
                    <Grid xs={12} container spacing={1} item key={index}>
                        <Grid xs={12} item>
                            <FormControl margin="normal">
                                <TextField
                                    value={required[index] || ""}
                                    variant="outlined"
                                    id={"itf-" + index}
                                    label="인터페이스 네임"
                                    name={"itf-" + index}
                                    size="medium"
                                    className="itf"
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