import React from "react";
import TextField from "@material-ui/core/TextField";
import {createStyles, makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
    createStyles({
        grid:{
            margin: theme.spacing(2),
        },
        elem:{
            margin: theme.spacing(0.5),
            minWidth: 100,
            maxWidth: 250,
        },
        elemSpe: {
            width:'50%',
            minWidth: 75,
            maxWidth: 140,
            margin: theme.spacing(0.5),
        }
    }),
);

const MyTextField = (props) => {

    const classes = useStyles();
    const {type} = props;

    return (
        <TextField
            className={type==='number'?classes.elemSpe:classes.elem}
            color={"primary"}
            variant={"filled"}
            {...props}
        />
    )

}

export default MyTextField;