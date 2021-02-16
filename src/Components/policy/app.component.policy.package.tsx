import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, makeStyles, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react"
import AddIcon from '@material-ui/icons/Add';


const style = makeStyles({
    buttonRight: {
        float: 'right',
        position: 'relative',
    }
});


export interface PackageDialogRawProps {
    keepMounted: boolean;
    open: boolean;
    onCreate: Function;
}


export default function PackageDialog(props: PackageDialogRawProps) {
    const classes = style();
    const { open: isOpen } = props;
    
    const [open, setOpen] = useState(isOpen);
    const [fields, setFields] = useState(["pk-0"]);
    const [required, setRequired] = useState([""]);
    const [resPK, setResPK] = useState({
        state: false,
        required: [] as string[],
    });


    const appendFields = () => {
        let element = `pk-${fields.length}`;
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
        console.log(resPK);
        props.onCreate("packages", resPK);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[resPK]);


    
    const handleRequiredChange = (index : number) => (e : React.ChangeEvent<HTMLInputElement>) => {
        let newArr = [...required];
        newArr[index] = e.target.value;
        setRequired(newArr);
    }
    


    const handleClose = () => {
        setResPK({
            state: false,
            required: []
        });
        setOpen(false);
    }


    const handleResIO = () => {
        setResPK({
            state: true,
            required: required
        });
        setOpen(false);
    }


    return (
        <Dialog 
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-pk"
                maxWidth="sm"
                fullWidth={true}
                scroll='paper'
                disableEscapeKeyDown
                disableBackdropClick
        >
        <DialogTitle id="form-dialog-pk">필수 구현 패키지</DialogTitle>
        <DialogContent dividers>
            <DialogContentText>
                패키지 경로를 지정하려면 입력하세요!
                <Button variant="outlined" onClick={() => appendFields()} startIcon={<AddIcon />} className={classes.buttonRight}>추가</Button>
            </DialogContentText>
                {fields.map((input, index) => (
                    <Grid xs={12} container spacing={1} item key={index}>
                        <Grid xs={12} item>
                            <FormControl fullWidth margin="normal">
                                <TextField
                                    value={required[index] || ""}
                                    variant="outlined"
                                    id={"pk-" + index}
                                    label="패키지 경로"
                                    name={"pk-" + index}
                                    size="medium"
                                    className="pk"
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