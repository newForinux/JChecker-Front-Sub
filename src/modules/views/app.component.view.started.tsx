import { Theme, withStyles, WithStyles } from "@material-ui/core";
import StarterMajorLayout from "./app.component.view.started.layout";
import Typographic from "../components/app.component.typography";
import Button from "../components/app.component.button";


const backgroundImage = 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80';

interface Props extends WithStyles<typeof styles> {}


const styles = (theme: Theme) => ({
    background: {
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#5d5447',
        backgroundPosition: 'center',
    },
    button: {
        minWidth: 125,
    },
    h5: {
        marginBottom: theme.spacing(4),
        marginTop: theme.spacing(4),
        [theme.breakpoints.up('sm')]: {
            marginTop: theme.spacing(10),
        },
    },
    more: {
        marginTop: theme.spacing(2),
    },
    textField: {
        background: 'white',
    }
});


function StarterMajor(props: Props) {
    const { classes } = props;

    const handleBottom = () => {
        window.scrollTo({top: 2000, left: 0, behavior: 'smooth'});
    }

    return (
        <StarterMajorLayout backgroundClassName={classes.background}>
            {}
            <img style={{ display : 'none' }} src={backgroundImage} alt="prioirty" />
            <Typographic color="inherit" align="center" variant="h2" marked="center">
                JUDGE YOUR ASSIGNMENTS
            </Typographic>
            <Typographic color="inherit" align="center" variant="h5" className={classes.h5}>
                We provide OOP-based Java program scoring service through static analysis.
            </Typographic>
            <Button
                color="secondary"
                variant="contained"
                size="medium"
                className={classes.button}
                onClick={handleBottom}
            >
                시작하기
            </Button>
            <Typographic variant="body2" color="inherit" className={classes.more}>
                with ISEL, HGU.
            </Typographic>

        </StarterMajorLayout>
        
    );
}


export default withStyles(styles)(StarterMajor);