import React from 'react';
import {Button, Grid} from "@material-ui/core";
import {createStyles, makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
    createStyles({
        elem:{
            margin: theme.spacing(1),
        },

    }),
);

const ResetSubmit = (props) => {
    const classes = useStyles();
    const { clearBtn } = props;

    return(
        <Grid container item
              direction="row"
              justify="flex-end"
              alignItems="flex-end"
        >
            <Button
                color="secondary"
                variant="contained"
                className={classes.elem}
                type="reset"
                onClick={clearBtn}
            >
                Reset
            </Button>

            <Button
                color="primary"
                variant="contained"
                type="submit"
                className={classes.elem}
            >
                Valider
            </Button>
        </Grid>
    )
}

export default ResetSubmit;