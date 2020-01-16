import React, { useState } from "react";
import { makeStyles, Box, Button } from "@material-ui/core";
import TextInput from "./input/text-input";
import ColorInput from "./input/color-input";
import SwitchInput from "./input/switch-input";

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

  // --------------- //
  // Content Objects //
  // --------------- //

  function handleUpdateField(event) {
    let fieldName = event.target.id,
      value = event.target.value,
      update = {};
    update[fieldName] = value;

    setFields((prevFields) => ({
      ...prevFields,
      ...update
    }));
  }

  // --------------- //
  // Content Objects //
  // --------------- //

  // N/A

  // --------------- //
  // Render Function //
  // --------------- //

  return (
    <form
      className={classes.parentBox}
      onSubmit={(event) => props.handleClickSubmit(event, fields)}
    >
      <Box className={classes.fieldContainer}>
        <>
          {Object.keys(props.schema).map((field) => {
            // Display nothing for inputs that include '_' (This is to ignore _id and other auto generated fields from the database)
            if (field.includes("_")) return null;
            else if (props.schema[field].type === "String") {
              // Display a text box for String fields
              return (
                <TextInput
                  key={field}
                  fieldName={field}
                  value={fields[field]}
                  handleUpdate={handleUpdateField}
                  required={props.Schema ? props.schema[field].required : false}
                />
              );
            } else if (props.schema[field].type === "Color") {
              // Display a color picker for Color fields
              return null;
              //Should be returning the color input object here
            } else if (props.schema[field].type === "Boolean") {
              // Display a switch for boolean inputs
              return <SwitchInput key={field} />;
            }
            // Display nothing for other inputs
            return null;
          })}
        </>
      </Box>
      <Box className={classes.buttonContainer}>
        <Button
          variant='outlined'
          onClick={() => {
            if (props.handleCancelAdd) props.handleCancelAdd();
            /* else setFields(props.fields); */
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
