import Button from "@material-ui/core/Button";
import React from "react";
import {createStyles, makeStyles} from "@material-ui/core/styles";

const useStyle = makeStyles((theme) =>
    createStyles({
        elem:{
            margin: theme.spacing(1),
        }
    }),
);

const SelfButton = (props) => {
    const classes = useStyle();
    return(
        <Button
            id={props.id}
            className={classes.elem}
            variant={"contained"}
            onClick={props.click}
            color={props.color}
        >
            {props.text}
        </Button>
    )
}
export default SelfButton;