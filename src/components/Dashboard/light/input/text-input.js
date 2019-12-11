import React from "react";
import { TextField, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  textField: {
    margin: theme.spacing(2, 3),
    display: "flex"
  }
}));
function TextInput(props) {
  const classes = useStyles();
  // console.log(props.variant);
  return (
    <TextField
      required
      id={props.field}
      label={props.field}
      className={classes.textField}
      margin='normal'
      value={props.value}
      onChange={props.handleUpdate}
      variant={props.variant}
    />
  );
}

export default TextInput;
