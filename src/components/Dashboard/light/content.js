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
    // console.log(fields);
  }

  // --------------- //
  // Content Objects //
  // --------------- //

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
            if (field.includes("_")) return null;
            else if (props.schema[field].type === "String") {
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
              return null;
              //Should be returning the color input object here
            } else if (props.schema[field].type === "Boolean") {
              return null;
              //Should be returning a switch input object here
            }
            return null;
            /* else if (field !== "_id")
               else if (field === "Color")
              return (
                <ColorInput
                  key={field}
                  field={field}
                  handleUpdate={props.handleUpdate}
                  color={props.fields["Color"]}
                  variant={undefined}
                />
              ); 
              return (
                <TextInput
                  key={field}
                  fieldName={field}
                  value={fieldValue}
                  handleUpdate={props.handleUpdate}
                  required={
                    props.Schema ? props.Schema[field].isRequired : false
                  }
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
