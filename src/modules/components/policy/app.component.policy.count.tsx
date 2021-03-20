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



export default function CountDialog(props: DialogRawProp) {
    const { t } = useTranslation();
    const { open: isOpen } = props;
    
    const [open, setOpen] = useState(isOpen);
    const [deduct, setDeduct] = useState(0);
    const [methods, setMethods] = useState(0);
    const [fields, setFields] = useState(0);
    const [enhancedFor, setEnhancedFor] = useState(0);

    const [resCnt, setResCnt] = useState({
        state: false,
        methodCount: 0,
        fieldsCount: 0,
        enForCount: 0,
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
        console.log(resCnt);
        props.onCreate("count", resCnt);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[resCnt]);



    const handleClose = () => {
        setResCnt({
            state: false,
            methodCount: 0,
            fieldsCount: 0,
            enForCount: 0,
            deductPoint : 0,
        });
        setOpen(false);
    }


    const handleResCnt = () => {
        setResCnt({
            state: true,
            methodCount: methods,
            fieldsCount: fields,
            enForCount: enhancedFor,
            deductPoint : deduct,
        });
        setOpen(false);
    }


    return (
        <Dialog 
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-cnt"
                maxWidth="sm"
                fullWidth={true}
                scroll='paper'
                disableEscapeKeyDown
        >
        <DialogTitle id="form-dialog-cnt">
            {t('policy.count.1')}
        </DialogTitle>
        <DialogContent dividers>
            <DialogContentText>
                {t('policy.count.2')}
            </DialogContentText>

            <Grid 
                container 
                spacing={2}
                direction='column' >
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
                <TextField
                        type="number"
                        value={methods}
                        label={t('policy.count.methods')}
                        size="small"
                        margin="dense"
                        onChange={e => setMethods(parseInt(e.target.value) || methods)}
                />

                <TextField
                        type="number"
                        value={fields}
                        label={t('policy.count.fields')}
                        size="small"
                        margin="dense"
                        onChange={e => setFields(parseInt(e.target.value) || fields)}
                />

                <TextField
                        type="number"
                        value={enhancedFor}
                        label={t('policy.count.enhance')}
                        size="small"
                        margin="dense"
                        onChange={e => setEnhancedFor(parseInt(e.target.value) || enhancedFor)}
                />
            </Grid>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    {t('closed')}
                </Button>
                <Button onClick={handleResCnt} color="primary">
                    {t('submit')}
                </Button>
            </DialogActions>
        </Dialog>
    );
}