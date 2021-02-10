import { Checkbox, 
    createStyles, 
    DialogActions, 
    DialogContent, 
    DialogContentText, 
    DialogTitle, 
    Fab, 
    FormControl, 
    FormControlLabel, 
    FormGroup, 
    Grid, 
    InputAdornment, 
    makeStyles, 
    TextField, 
    Theme, 
    Tooltip} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import React, { useEffect } from 'react';
import { useDialog } from './DialogProvider';
import AddIcon from '@material-ui/icons/Add';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        dialogWrapper: {
            padding: theme.spacing(2),
            position: 'absolute',
            top: theme.spacing(1),
            fontSize: 16,
            fontFamily: [
                '-apple-system',
                'Roboto',
                'Ubuntu'
            ].join(',')
        },

        formControl: {
            margin: theme.spacing(3),
            width: 'auto',
        },

        textControl: {
            alignItems: 'right',
            width: 'auto'
        }
    }))



export default function PolicyPopup() {
    const [openDialog, closeDialog] = useDialog();
    
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [target, setTarget] = React.useState("");
    const [fields, setFields] = React.useState(["field-0"]);

    const initial = {
        checkedInput: false,
        checkedEncap: false,
        checkedClass: false,
        checkedPackage: false,
        checkedCustomExc: false,
        checkedCustomStr: false,
        checkedInterface: false,
        checkedSuperclass: false,
        checkedOverriding: false,
        checkedOverloading: false,
        checkedThread: false,
        checkedJavadoc: false
    };

    const [state, setState] = React.useState(initial);

    
    const [required, setRequired] = React.useState({
        output: "",
        reqClass: "",
        reqPackage: "",
    })

    const handleOpen = () => {
        setOpen(true);
    };


    const handleClose = () => {
        setOpen(false);
        setState(initial);
    };

    
    
    

    useEffect(() => {
        const appendFields = () => {
            let newInput = `field-${fields.length}`;
            console.log(fields.concat([newInput]));
            setFields(fields => fields.concat([newInput]));
        }
        
        if (target === "checkedInput" && state.checkedInput)
            openDialog({
                children: (
                    <>
                        <DialogTitle id="form-dialog-next">테스트 케이스</DialogTitle>
                         <DialogContent dividers>
                            <DialogContentText>
                                채점 시 입력값과 기대값을 입력합니다.
                            </DialogContentText>
                            {fields.map((input, index) => (
                                <Grid xs={12} container spacing={1} item>
                                    <Grid xs={6} item>
                                        <FormControl margin="dense">
                                            <TextField
                                                variant="outlined"
                                                required
                                                id={input + "in"}
                                                label="Input"
                                                name={input + "in"}
                                                size="medium"
                                                className="in"
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid xs={6} item>
                                        <FormControl margin="dense">
                                            <TextField
                                                variant="outlined"
                                                required
                                                id={input + "out"}
                                                label="Input"
                                                name={input + "out"}
                                                size="medium"
                                                className="out"
                                                InputProps={{
                                                    endAdornment: index + 1 ===
                                                    fields.length && (
                                                        <InputAdornment position="start">
                                                            <Tooltip title="Add">
                                                                <Fab
                                                                    color="primary"
                                                                    size="small"
                                                                    onClick={() => appendFields()}
                                                                >
                                                                    <AddIcon />
                                                                </Fab>
                                                            </Tooltip>
                                                        </InputAdornment>
                                                    )
                                                }}
                                            />
                                        </FormControl>
                                    </Grid>
                                </Grid>

                            ))}

                            </DialogContent>
                        
                            <DialogActions>
                                <Button onClick={() => closeDialog()} color="primary">
                                    완료
                                </Button>
                            </DialogActions>
                        </>
                    )
                });
            console.log(fields);
    }, [closeDialog, openDialog, fields, state, target]);



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState(state => ({...state, [e.target.name]: e.target.checked}));
        setTarget(target => e.target.name);
    };


    


    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleOpen}>
                채점 기준 설정
            </Button>
            <Dialog 
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                maxWidth="md"
                scroll='paper'
                className={classes.dialogWrapper}>
                <DialogTitle id="form-dialog-title">채점 기준</DialogTitle>
                <DialogContent dividers>
                    <DialogContentText>
                        과제 제출 시 정적 분석을 통해 검사할 항목을 선택할 수 있습니다.
                    </DialogContentText>
                    <FormGroup>
                        <FormControlLabel
                             control={
                                <Checkbox checked={state.checkedInput}
                                        onChange={handleChange}
                                        name="checkedInput" />}
                            label="Input"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={state.checkedClass}
                                        onChange={handleChange}
                                        name="checkedClass" />}
                            label="Classes"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={state.checkedPackage}
                                        onChange={handleChange}
                                        name="checkedPackage" />}
                            label="Packages"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={state.checkedInterface}
                                        onChange={handleChange}
                                        name="checkedInterface" />}
                            label="Interface"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={state.checkedSuperclass}
                                        onChange={handleChange}
                                        name="checkedSuperclass" />}
                            label="Superclass"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={state.checkedOverriding}
                                        onChange={handleChange}
                                        name="checkedOverriding" />}
                            label="Overriding"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={state.checkedOverloading}
                                        onChange={handleChange}
                                        name="checkedOverloading" />}
                            label="Overloading"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={state.checkedCustomExc}
                                        onChange={handleChange}
                                        name="checkedCustomExc" />}
                            label="Custom Exception Class"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={state.checkedCustomStr}
                                        onChange={handleChange}
                                        name="checkedCustomStr" />}
                            label="Custom Data Structure Class"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={state.checkedThread}
                                        onChange={handleChange}
                                        name="checkedThread" />}
                            label="Threads"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={state.checkedJavadoc}
                                        onChange={handleChange}
                                        name="checkedJavadoc" />}
                            label="Javadoc"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={state.checkedEncap}
                                        onChange={handleChange}
                                        name="checkedEncap" />}
                            label="Encapsulation"
                        />
                    </FormGroup>
                </DialogContent>
                
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        닫기
                    </Button>
                    
                </DialogActions>
                
            </Dialog>
        </div>
        
    )
    
}