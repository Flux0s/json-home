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
      id={props.id}
      label={props.fieldName}
      className={classes.textField}
      margin='normal'
      value={props.value}
      onChange={props.handleUpdate}
      variant='filled'
      required={props.required}
    />
  );
}

export default TextInput;
