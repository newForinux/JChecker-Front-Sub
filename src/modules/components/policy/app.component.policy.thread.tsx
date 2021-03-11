import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react"



interface PackageDialogRawProps {
    keepMounted: boolean;
    open: boolean;
    onCreate: Function;
}


export default function ThreadDialog(props: PackageDialogRawProps) {
    const { open: isOpen } = props;
    
    const [open, setOpen] = useState(isOpen);
    const [deduct, setDeduct] = useState(0);
    const [resThd, setResThd] = useState({
        state: false,
        deductPoint : 0,
    });


    const handleOpen = () => {
        setOpen(true);
    }


    useEffect(() => {
        if (isOpen) {
            handleOpen();
        }
    },[isOpen]);


    useEffect(() => {
        console.log(resThd);
        props.onCreate("javadoc", resThd);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[resThd]);



    const handleClose = () => {
        setResThd({
            state: false,
            deductPoint : 0,
        });
        setOpen(false);
    }


    const handleResIO = () => {
        setResThd({
            state: true,
            deductPoint : deduct,
        });
        setOpen(false);
    }


    return (
        <Dialog 
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-jvd"
                maxWidth="sm"
                fullWidth={true}
                scroll='paper'
                disableEscapeKeyDown
        >
        <DialogTitle id="form-dialog-pk">스레드 설정</DialogTitle>
        <DialogContent dividers>
            <DialogContentText>
                스레드 클래스를 상속받고 실제로 사용했는지 판단합니다.
            </DialogContentText>

            <Grid container spacing={2}>
                <Grid item>
                    <TextField
                        type="number"
                        value={deduct}
                        label="위반 시 감점할 점수"
                        size="small"
                        margin="dense"
                        onChange={e => setDeduct(parseFloat(e.target.value) || deduct)}
                    />
                </Grid>
            </Grid>
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