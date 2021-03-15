import { Button, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogContentText, 
    DialogTitle, 
    Grid, 
    TextField } from "@material-ui/core";
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next/";
import { DialogRawProp } from ".";



export default function EncapDialog(props: DialogRawProp) {
    const { t } = useTranslation();
    const { open: isOpen } = props;
    
    const [open, setOpen] = useState(isOpen);
    const [deduct, setDeduct] = useState(0);
    const [resEnc, setResEnc] = useState({
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
        console.log(resEnc);
        props.onCreate("encapsulation", resEnc);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[resEnc]);



    const handleClose = () => {
        setResEnc({
            state: false,
            deductPoint : 0,
        });
        setOpen(false);
    }


    const handleResIO = () => {
        setResEnc({
            state: true,
            deductPoint : deduct,
        });
        setOpen(false);
    }


    return (
        <Dialog 
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-enc"
                maxWidth="sm"
                fullWidth={true}
                scroll='paper'
                disableEscapeKeyDown
        >
        <DialogTitle id="form-dialog-pk">
            {t('policy.encap.1')}
        </DialogTitle>
        <DialogContent dividers>
            <DialogContentText>
                {t('policy.encap.2')}
            </DialogContentText>

            <Grid container spacing={2}>
                <Grid item>
                    <TextField
                        type="number"
                        value={deduct}
                        label={t('policy.basic.deduct.boolean')}
                        size="small"
                        margin="dense"
                        onChange={e => setDeduct(parseFloat(e.target.value) || deduct)}
                    />
                </Grid>
            </Grid>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    {t('closed')}
                </Button>
                <Button onClick={handleResIO} color="primary">
                    {t('submit')}
                </Button>
            </DialogActions>
        </Dialog>
    );
}