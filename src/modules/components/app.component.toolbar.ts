import { Theme, Toolbar, withStyles } from "@material-ui/core";

export const styles = (theme: Theme) => ({
    root: {
        height: 70,
        [theme.breakpoints.up('sm')]: {
            height: 80,
        }
    },
});


export default withStyles(styles)(Toolbar);