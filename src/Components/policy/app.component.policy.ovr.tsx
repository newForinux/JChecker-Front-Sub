import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, makeStyles, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react"
import AddIcon from '@material-ui/icons/Add';


const style = makeStyles({
    buttonRight: {
        float: 'right',
        position: 'relative',
    }
});


export interface OverridingDialogRawProps {
    keepMounted: boolean;
    open: boolean;
}


export default function OverridingDialog(props: OverridingDialogRawProps) {
    const classes = style();
    const { open: isOpen } = props;
    
    const [open, setOpen] = useState(isOpen);
    const [fields, setFields] = useState(["ovr-0"]);
    const [required, setRequired] = useState([""]);
    const [resOvr, setResOvr] = useState({
        required: [] as string[],
    });


    const appendFields = () => {
        let element = `ovr-${fields.length}`;
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

        if (resOvr.required.length > 0)
            console.log(resOvr);
    },[isOpen, resOvr]);


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
        setResOvr({
            required: required
        });
        setOpen(false);
    }


    return (
        <Dialog 
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-ovr"
                maxWidth="md"
                scroll='paper'
                disableEscapeKeyDown
                disableBackdropClick
        >
        <DialogTitle id="form-dialog-ovr">오버라이딩 검사</DialogTitle>
        <DialogContent dividers>
            <DialogContentText>
                어떤 메서드가 오버라이딩되어야 하나요?
                <Button variant="outlined" onClick={() => appendFields()} startIcon={<AddIcon />} className={classes.buttonRight}>추가</Button>
            </DialogContentText>
                {fields.map((input, index) => (
                    <Grid xs={12} container spacing={1} item key={index}>
                        <Grid xs={12} item>
                            <FormControl margin="normal">
                                <TextField
                                    value={required[index] || ""}
                                    variant="outlined"
                                    id={"ovr-" + index}
                                    label="메서드 네임"
                                    name={"ovr-" + index}
                                    size="medium"
                                    className="ovr"
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