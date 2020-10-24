import {KeyboardDatePicker,MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import React from "react";
import {createStyles, makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
    createStyles({
        elem:{
            margin: theme.spacing(0.5),
            minWidth: 100,
            maxWidth: 250,
        },
    }),
);

const MyDatePicker = (props) => {
    const classes = useStyles();
    return(
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                className={classes.elem}
                color={"primary"}
                variant={"filled"}
                format="yyyy-MM-dd"
                {...props}
            />
        </MuiPickersUtilsProvider>
    )
}

export default MyDatePicker;