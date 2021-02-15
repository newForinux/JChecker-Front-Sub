import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, FormGroup } from "@material-ui/core";
import produce from "immer";
import React, { useState } from "react";
import ClassDialog from "./policy/app.component.policy.classes";
import StructureDialog from "./policy/app.component.policy.custom.ds";
import ExceptionDialog from "./policy/app.component.policy.custom.except";
import InterfaceDialog from "./policy/app.component.policy.interface";
import InputDialog from "./policy/app.component.policy.io";
import OverloadingDialog from "./policy/app.component.policy.ovl";
import OverridingDialog from "./policy/app.component.policy.ovr";
import PackageDialog from "./policy/app.component.policy.package";
import SuperclassDialog from "./policy/app.component.policy.super";



export default function SelectCond() {
    const [open, setOpen] = useState(false);
    
    const initial = {
        inputs: false,
        classes: false,
        packages: false,
        custexc: false,
        custstr: false,
        interfaces: false,
        superclass: false,
        overriding: false,
        overloading: false,
        threads: false,
        javadoc: false,
        encaps: false
    };

    
    const [state, setState] = useState(initial);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        setState(initial);
    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState(
            produce(draft => {
                draft[e.target.name] = e.target.checked;
            })
        );
    }

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleOpen}>
                채점 기준 설정
            </Button>
            
            {open &&
                <Dialog 
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                    maxWidth="md"
                    scroll='paper'
                >
                <DialogTitle id="form-dialog-title">채점 기준</DialogTitle>
                <DialogContent dividers>
                <DialogContentText>
                    과제 제출 시 정적 분석을 통해 검사할 항목을 선택할 수 있습니다.
                </DialogContentText>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox checked={state.inputs}
                                        onChange={handleChange}
                                        name="inputs" />}
                            label="Input"
                        />
                        
                        <FormControlLabel
                            control={
                                <Checkbox checked={state.classes}
                                        onChange={handleChange}
                                        name="classes" />}
                            label="Classes"
                        />
                        
                        <FormControlLabel
                            control={
                                <Checkbox checked={state.packages}
                                        onChange={handleChange}
                                        name="packages" />}
                            label="Packages"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={state.interfaces}
                                        onChange={handleChange}
                                        name="interfaces" />}
                            label="Interface"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={state.superclass}
                                        onChange={handleChange}
                                        name="superclass" />}
                            label="Superclass"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={state.overriding}
                                        onChange={handleChange}
                                        name="overriding" />}
                            label="Overriding"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={state.overloading}
                                        onChange={handleChange}
                                        name="overloading" />}
                            label="Overloading"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={state.custexc}
                                        onChange={handleChange}
                                        name="custexc" />}
                            label="Custom Exception Class"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={state.custstr}
                                        onChange={handleChange}
                                        name="custstr" />}
                            label="Custom Data Structure Class"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={state.threads}
                                        onChange={handleChange}
                                        name="threads" />}
                            label="Threads"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={state.javadoc}
                                        onChange={handleChange}
                                        name="javadoc" />}
                            label="Javadoc"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={state.encaps}
                                        onChange={handleChange}
                                        name="encaps" />}
                            label="Encapsulation"
                        />
                    </FormGroup>
                    
                </DialogContent>
                
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                            닫기
                    </Button>
                    <Button onClick={handleClose} color="primary">
                            제출
                    </Button>
                </DialogActions>
                
                {state.inputs && 
                    <InputDialog open={state.inputs} keepMounted /> }
                
                {state.classes &&
                    <ClassDialog open={state.classes} keepMounted /> }

                {state.packages &&
                    <PackageDialog open={state.packages} keepMounted />}
                
                {state.interfaces &&
                    <InterfaceDialog open={state.interfaces} keepMounted />}

                {state.superclass &&
                    <SuperclassDialog open={state.superclass} keepMounted />}

                {state.overriding &&
                    <OverridingDialog open={state.overriding} keepMounted />}

                {state.overloading &&
                    <OverloadingDialog open={state.packages} keepMounted />}

                {state.custexc &&
                    <ExceptionDialog open={state.custexc} keepMounted />}

                {state.custstr &&
                    <StructureDialog open={state.custstr} keepMounted />}

                </Dialog>
            }
        </div>
    )
}