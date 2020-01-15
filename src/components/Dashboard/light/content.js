import React, { useState } from "react";
import { makeStyles, Box, Button } from "@material-ui/core";
import TextInput from "./input/text-input";
import ColorInput from "./input/color-input";

const useStyles = makeStyles((theme) => ({
  parentBox: {
    width: "100%",
    display: "flex",
    flexFlow: "column",
    height: "100%",
    padding: theme.spacing(2)
  },
  fieldContainer: {
    flex: "1 1 auto"
    // textAlign: "center"
    // padding: 8px, 16px;
  },
  buttonContainer: {
    flex: "0 1 auto",
    textAlign: "right"
  },
  button: {
    marginLeft: theme.spacing(1)
  }
}));

function Content(props) {
  // Definition and initialization
  const classes = useStyles();

  return (
    <form
      className={classes.parentBox}
      onSubmit={(event) => props.handleSubmit(event)}
    >
      <Box className={classes.fieldContainer}>
        <>
          {Object.keys(props.fields).map((field) => {
            if (field === "Name") {
              return (
                <TextInput
                  key={field}
                  field={field}
                  value={props.fields[field]}
                  handleUpdate={props.handleUpdate}
                  variant={undefined}
                />
              );
            } else if (field === "Color")
              return (
                <ColorInput
                  key={field}
                  field={field}
                  handleUpdate={props.handleUpdate}
                  color={props.fields["Color"]}
                  variant={undefined}
                />
              );
            else if (field !== "_id")
              return (
                <TextInput
                  key={field}
                  field={field}
                  value={props.fields[field]}
                  handleUpdate={props.handleUpdate}
                  variant='outlined'
                />
              );
            else return null;
          })}
        </>
      </Box>
      <Box className={classes.buttonContainer}>
        <Button
          variant='outlined'
          onClick={() => {
            if (props.handleCancelAdd) props.handleCancelAdd();
            {/* else setFields(props.fields); */}
          }}
          /* disabled={
            !props.handleCancelAdd &&
            JSON.stringify(props.fields) === JSON.stringify(fields)
          } */
        >
          {props.secondaryButtonText}
        </Button>
        <Button
          type='submit'
          className={classes.button}
          variant='contained'
          color='primary'
        >
          {props.primaryButtonText}
        </Button>
      </Box>
    </form>
  );
}
export default Content;
