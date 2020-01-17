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
  // -------------- //
  // Initialization //
  // -------------- //

  const classes = useStyles();
  const [fields, setFields] = useState(props.fields);
  const fieldIdDelimiter = "@";

  // ---------------- //
  // Helper Functions //
  // ---------------- //

  // Converts a string to the sum of the ascii values of it's characters
  function asciiValueOfString(string) {
    let value = 0;
    [...string].forEach((char) => {
      value += char.charCodeAt(0);
    });
    return value;
  }

  // -------------- //
  // Event Handlers //
  // -------------- //

  function handleUpdateField(event) {
    // console.log(event.target.id);
    // console.log(event.target.value);

    // The name of the field is prefixed by the index of the light (to avoid duplicate id's in the dom)
    // This forces decomposision based on the fieldIdDelimiter
    let fieldName = event.target.id.substr(
        0,
        event.target.id.indexOf(fieldIdDelimiter)
      ),
      value = event.target.value,
      update = {};
    update[fieldName] = value;

    setFields((prevFields) => ({
      ...prevFields,
      ...update
    }));
  }

  function handleClickSecondary() {
    if (props.new) props.handleCancelAdd();
    else setFields(props.fields);
  }

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
          {Object.keys(props.schema)
            //This sort function groups fields based on their data type (so that input types are grouped in the render)
            .sort(
              (field1, field2) =>
                asciiValueOfString(props.schema[field1].type) -
                asciiValueOfString(props.schema[field2].type)
            )
            .map((field) => {
              console.log(props.schema[field]);
              console.log(props.schema[field].required);
              // Display nothing for inputs that include '_' (This is to ignore _id and other auto generated fields from the database)
              if (field.includes("_")) return null;
              else if (props.schema[field].type === "String") {
                // Display a text box for String fields
                return (
                  <TextInput
                    key={field}
                    id={field + fieldIdDelimiter + fields._id}
                    fieldName={field}
                    value={fields[field]}
                    handleUpdate={handleUpdateField}
                    required={
                      props.Schema ? props.schema[field].required : false
                    }
                  />
                );
              } else if (props.schema[field].type === "Color") {
                // Display a color picker for Color fields
                return null;
                //Should be returning the color input object here
              } else if (props.schema[field].type === "Boolean") {
                // Display a switch for boolean inputs
                return (
                  <SwitchInput
                    key={field}
                    id={field + fieldIdDelimiter + fields._id}
                    fieldName={field}
                    value={fields[field] ? fields[field] : "false"}
                    handleUpdate={handleUpdateField}
                  />
                );
              }
              // Display nothing for other (non-configured)inputs
              return null;
            })}
        </>
      </Box>
      <Box className={classes.buttonContainer}>
        <Button
          variant='outlined'
          onClick={handleClickSecondary}
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
