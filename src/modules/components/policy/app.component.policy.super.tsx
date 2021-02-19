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
    onCreate: Function;
}


export default function SuperclassDialog(props: SuperclassDialogRawProps) {

    const classes = style();
    const { open: isOpen } = props;
    
    const [open, setOpen] = useState(isOpen);
    const [fields, setFields] = useState(["spc-0"]);
    const [required, setRequired] = useState([""]);
    const [deduct, setDeduct] = useState(0);
    const [max_deduct, setMax_deduct] = useState(0);
    const [resSpc, setResSpc] = useState({
        state: false,
        required: [] as string[],
        deductPoint : 0,
        maxDeduct: 0
    });


    const appendFields = () => {
        let element = `spc-${fields.length}`;
        setFields(fields => fields.concat([element]));
    }


    const handleOpen = () => {
        setOpen(true);
    }


    useEffect(() => {
        if (isOpen)
            handleOpen();

    }, [isOpen]);


    useEffect(() => {
        console.log(resSpc);
        props.onCreate("inheritSuper", resSpc);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[resSpc]);

    
    const handleRequiredChange = (index : number) => (e : React.ChangeEvent<HTMLInputElement>) => {
        let newArr = [...required];
        newArr[index] = e.target.value;
        setRequired(newArr);
    }
    

    const handleClose = () => {
        setResSpc({
            state: false,
            required: [],
            deductPoint : 0,
            maxDeduct: 0
        });
        setOpen(false);
    }


    const handleResIO = () => {
        setResSpc({
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
                onClose={(event, reason) => {
                    if (reason !== 'backdropClick') {
                        handleClose();
                    }
                }}
                aria-labelledby="form-dialog-spc"
                maxWidth="md"
                scroll='paper'
                disableEscapeKeyDown
        >
        <DialogTitle id="form-dialog-spc">슈퍼 클래스 상속 여부</DialogTitle>
        <DialogContent dividers>
            <DialogContentText>
                슈퍼 클래스 상속 여부를 판단합니다.
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