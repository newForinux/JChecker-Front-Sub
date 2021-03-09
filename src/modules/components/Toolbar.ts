import { Theme, Toolbar, withStyles } from "@material-ui/core";
import React from "react";

export const styles = (theme: Theme) => ({
    root: {
        height: 70,
        [theme.breakpoints.up('sm')]: {
            height: 80,
        }
    },
});


export default React.memo(withStyles(styles)(Toolbar));