import React from "react";
import { Switch, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  switchContainer: {
    margin: theme.spacing(2, 3),
    display: "flex"
  },
  switchLabel: {
    margin: "auto",
    flex: "1 1 auto",
    fontSize: "1rem"
  },
  switch: {
    // margin: theme.spacing(2, 3),
    flex: "0 1 auto"
  }
}));
function SwitchInput(props) {
  // -------------- //
  // Initialization //
  // -------------- //

  const classes = useStyles();

  // -------------- //
  // Event Handlers //
  // -------------- //

  function handleClickSwitch(event) {
    let eventMock = { target: {} };
    eventMock.target["id"] = event.target.id;
    eventMock.target["value"] = event.target.checked;
    props.handleUpdate(eventMock);
  }

  // --------------- //
  // Render Function //
  // --------------- //

  return (
    <div className={classes.switchContainer}>
      <Typography variant='body2' className={classes.switchLabel}>
        {props.fieldName}
      </Typography>
      <Switch
        id={props.id}
        className={classes.switch}
        onChange={handleClickSwitch}
        checked={props.value}
      />
    </div>
  );
}

export default SwitchInput;
