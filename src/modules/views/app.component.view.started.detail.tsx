import { Container, createStyles, Grid, Theme, withStyles, WithStyles } from "@material-ui/core";
import Typographic from "../components/app.component.typography";
import React from "react";


interface Props extends WithStyles<typeof styles> {}

const styles = (theme: Theme) => createStyles({
    root: {
        display: 'flex',
        overflow: 'hidden',
        backgroundColor: theme.palette.secondary.light,
    },
    container: {
        marginTop: theme.spacing(15),
        marginBottom: theme.spacing(30),
        display: 'flex',
        position: 'relative',
        flexDirection: 'column',
        alignItems: 'center',
    },
    number: {
      fontSize: 24,
      fontFamily: theme.typography.fontFamily,
      color: theme.palette.secondary.main,
      fontWeight: theme.typography.fontWeightMedium, 
    },
    item: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(0, 5),
    },
    image: {
        height: 55,
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
    },
    title: {
        marginBottom: theme.spacing(14),
    },
    hologram: {
        pointerEvents: 'none',
        position: 'absolute',
        top: -180,
    },
});


function StarterDetail(props: Props) {
    const { classes } = props;

    return (
        <section className={classes.root}>
            <Container className={classes.container}>
                <img
                    src="/static/hologram.png"
                    className={classes.hologram}
                    alt="back hologram"
                />
                <Typographic variant="h4" marked="center" className={classes.title} component="h2">
                    How the service works
                </Typographic>
                <div>
                    <Grid container spacing={5}>
                        <Grid item xs={12} md={4}>
                            <div className={classes.item}>
                                <div className={classes.number}>1.</div>
                                <img
                                    src="/static/file_add.svg"
                                    alt="file_add"
                                    className={classes.image}
                                />
                                <Typographic variant="h5" align="center">
                                    소스 코드를 업로드합니다.<br />제출 방식은 .zip 또는 Github URL이 될 수 있습니다.
                                </Typographic>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <div className={classes.item}>
                                <div className={classes.number}>2.</div>
                                <img
                                    src="/static/executing.svg"
                                    alt="execute"
                                    className={classes.image}
                                />
                                <Typographic variant="h5" align="center">
                                    정적 분석 및 채점 기준, <br />여러 테스트 케이스로 제출된 과제를 채점합니다.
                                </Typographic>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <div className={classes.item}>
                                <div className={classes.number}>3.</div>
                                <img
                                    src="/static/diagram.svg"
                                    alt="file_add"
                                    className={classes.image}
                                />
                                <Typographic variant="h5" align="center">
                                    도표를 활용해<br />채점 결과를 시각화합니다.
                                </Typographic>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </section>
    )
}



export default withStyles(styles)(StarterDetail);