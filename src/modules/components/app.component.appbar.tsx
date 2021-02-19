import MuiAppBar from '@material-ui/core/AppBar';
import React from "react";


export default function AppBar(children: any) {

    return <MuiAppBar elevation={0} position="static" {...children} />;
}