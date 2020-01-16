import React from "react";
import { Switch, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  textField: {
    margin: theme.spacing(2, 3),
    display: "flex"
  }
}));
function SwitchInput(props) {
  const classes = useStyles();
  return <Switch />;
}

export default SwitchInput;
