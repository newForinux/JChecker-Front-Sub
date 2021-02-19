import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, makeStyles, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react"
import AddIcon from '@material-ui/icons/Add';


const style = makeStyles({
    buttonRight: {
        float: 'right',
        position: 'relative',
    }
});


export interface OverloadingDialogRawProps {
    keepMounted: boolean;
    open: boolean;
    onCreate: Function;
}


export default function OverloadingDialog(props: OverloadingDialogRawProps) {
    const classes = style();
    const { open: isOpen } = props;
    
    const [open, setOpen] = useState(isOpen);
    const [fields, setFields] = useState(["ovl-0"]);
    const [required, setRequired] = useState([""]);
    const [deduct, setDeduct] = useState(0);
    const [max_deduct, setMax_deduct] = useState(0);
    const [resOvl, setResOvl] = useState({
        state: false,
        required: [] as string[],
        deductPoint : 0,
        maxDeduct: 0
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
        }

    },[isOpen]);


    useEffect(() => {
        console.log(resOvl);
        props.onCreate("overloading", resOvl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[resOvl]);

    
    const handleRequiredChange = (index : number) => (e : React.ChangeEvent<HTMLInputElement>) => {
        let newArr = [...required];
        newArr[index] = e.target.value;
        setRequired(newArr);
    }
    
    
    const handleClose = () => {
        setResOvl({
            state: false,
            required: [],
            deductPoint : 0,
            maxDeduct: 0
        });
        setOpen(false);
    }


    const handleResIO = () => {
        setResOvl({
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
                aria-labelledby="form-dialog-ovl"
                maxWidth="sm"
                fullWidth={true}
                scroll='paper'
                disableEscapeKeyDown
        >
        <DialogTitle id="form-dialog-ovl">오버로딩 검사</DialogTitle>
        <DialogContent dividers>
            <DialogContentText>
                어떤 메서드가 오버로딩되어야 하나요?
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
                                id={"ovl-" + index}
                                label="메서드 네임"
                                name={"ovl-" + index}
                                size="medium"
                                className="ovl"
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