import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, makeStyles, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react"
import AddIcon from '@material-ui/icons/Add';


const style = makeStyles({
    buttonRight: {
        float: 'right',
        position: 'relative',
    }
});


export interface ClassDialogRawProps {
    keepMounted: boolean;
    open: boolean;
}


export default function ClassDialog(props: ClassDialogRawProps) {
    const classes = style();
    const { open: isOpen } = props;
    
    const [open, setOpen] = useState(isOpen);
    const [fields, setFields] = useState(["cs-0"]);
    const [required, setRequired] = useState([""]);
    const [resCS, setResCS] = useState({
        required: [] as string[],
    });


    const appendFields = () => {
        let element = `cs-${fields.length}`;
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

        if (resCS.required.length > 0)
            console.log(resCS);
    },[isOpen, resCS]);


    const handleClose = () => {
        setOpen(false);
    }

    
    const handleRequiredChange = (index : number) => (e : React.ChangeEvent<HTMLInputElement>) => {
        let newArr = [...required];
        newArr[index] = e.target.value;
        setRequired(newArr);
        setOpen(false);
    }
    

    const handleResIO = () => {
        setResCS({
            required: required
        });
        setOpen(false);
    }
 

    return (
        <Dialog 
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-cs"
                maxWidth="md"
                scroll='paper'
                disableEscapeKeyDown
                disableBackdropClick
        >
        <DialogTitle id="form-dialog-cs">필수 구현 클래스</DialogTitle>
        <DialogContent dividers>
            <DialogContentText>
                필수로 구현해야 할 클래스가 있나요?
                <Button variant="outlined" onClick={() => appendFields()} startIcon={<AddIcon />} className={classes.buttonRight}>추가</Button>
            </DialogContentText>
                {fields.map((input, index) => (
                    <Grid xs={12} container spacing={1} item key={index}>
                        <Grid xs={12} item>
                            <FormControl margin="normal">
                                <TextField
                                    value={required[index] || ""}
                                    variant="outlined"
                                    id={"cs-" + index}
                                    label="클래스 네임"
                                    name={"cs-" + index}
                                    size="medium"
                                    className="cs"
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