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
  const [fields, setFields] = useState(props.fields);

  // Event handlers

  function handleUpdate(event) {
    let id = event.target.id,
      update = {},
      value = event.target.value;
    update[id] = value;
    setFields((prevState) => ({ ...prevState, ...update }));
  }

  return (
    <form
      className={classes.parentBox}
      onSubmit={(event) => props.handleSubmit(event, fields)}
    >
      <Box className={classes.fieldContainer}>
        <>
          {Object.keys(fields).map((field) => {
            if (field === "Name") {
              return (
                <TextInput
                  key={field}
                  field={field}
                  value={fields[field]}
                  handleUpdate={handleUpdate}
                  variant={undefined}
                />
              );
            } else if (field === "Color")
              return (
                <ColorInput
                  key={field}
                  field={field}
                  handleUpdate={handleUpdate}
                  color={ fields["Color"] }
                  variant={undefined}
                />
              );
            else if (field !== "_id")
              return (
                <TextInput
                  key={field}
                  field={field}
                  value={fields[field]}
                  handleUpdate={handleUpdate}
                  variant='outlined'
                />
              );
            return null;
            /*
            else if (field === "Color")
              return (
                <TextInput
                  field={field}
                  value={fields[field]}
                  handleUpdate={handleUpdate}
                  variant='outlined'
                />
              ); */
          })}
        </>
      </Box>
      <Box className={classes.buttonContainer}>
        <Button
          variant='outlined'
          onClick={() => {
            if (props.handleCancelAdd) props.handleCancelAdd();
            else setFields(props.fields);
          }}
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
