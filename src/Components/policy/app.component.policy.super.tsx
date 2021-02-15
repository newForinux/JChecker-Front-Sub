import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, makeStyles, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react"
import AddIcon from '@material-ui/icons/Add';


const style = makeStyles({
    buttonRight: {
        float: 'right',
        position: 'relative',
    }
});


export interface SuperclassDialogRawProps {
    keepMounted: boolean;
    open: boolean;
}


export default function SuperclassDialog(props: SuperclassDialogRawProps) {

    const classes = style();
    const { open: isOpen } = props;
    
    const [open, setOpen] = useState(isOpen);
    const [fields, setFields] = useState(["spc-0"]);
    const [required, setRequired] = useState([""]);
    const [resSpc, setResSpc] = useState({
        required: [] as string[],
    });


    const appendFields = () => {
        let element = `spc-${fields.length}`;
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

        if (resSpc.required.length > 0)
            console.log(resSpc);
    },[isOpen, resSpc]);


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
        setResSpc({
            required: required
        });
        setOpen(false);
    }
    

    return (
        <Dialog 
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-spc"
                maxWidth="md"
                scroll='paper'
                disableEscapeKeyDown
                disableBackdropClick
        >
        <DialogTitle id="form-dialog-spc">슈퍼 클래스 상속 여부</DialogTitle>
        <DialogContent dividers>
            <DialogContentText>
                슈퍼 클래스 상속 여부를 판단합니다.
                <Button variant="outlined" onClick={() => appendFields()} startIcon={<AddIcon />} className={classes.buttonRight}>추가</Button>
            </DialogContentText>
                {fields.map((input, index) => (
                    <Grid xs={12} container spacing={1} item key={index}>
                        <Grid xs={12} item>
                            <FormControl margin="normal">
                                <TextField
                                    value={required[index] || ""}
                                    variant="outlined"
                                    id={"spc-" + index}
                                    label="슈퍼 클래스 네임"
                                    name={"spc-" + index}
                                    size="medium"
                                    className="spc"
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