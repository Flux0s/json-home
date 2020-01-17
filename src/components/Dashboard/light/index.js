import React from "react";
import {
  Card,
  Grid,
  makeStyles,
  CircularProgress,
  Box
} from "@material-ui/core";

import Content from "./content";
import { default as AddContent } from "./addButton";

const useStyles = makeStyles((theme) => ({
  card: {
    width: "100%",
    height: "100%"
  },
  gridItem: {
    [theme.breakpoints.down("xs")]: {
      margin: theme.spacing(4),
      height: "450px",
      width: "100%"
    },
    [theme.breakpoints.up("sm")]: {
      margin: theme.spacing(2),
      height: "450px",
      width: "350px"
    },
    [theme.breakpoints.up("md")]: {
      margin: theme.spacing(2),
      height: "450px",
      width: "425px"
    },
    [theme.breakpoints.up("lg")]: {
      marginTop: theme.spacing(6, 4),
      height: "450px",
      width: "450px"
    }
  },
  loadingContainer: {
    width: "inherit",
    height: "100%",
    display: "flex",
    flexFlow: "column"
  },
  loadingItem: {
    margin: "auto",
    width: "inherit",
    flex: "0 1 auto",
    textAlign: "center",
    fontSize: "1.5em"
  }
}));

const Light = (props) => {
  // -------------- //
  // Initialization //
  // -------------- //

  const classes = useStyles();
  const existingLightPrimaryButtonText = "Update";
  const existingLightSecondaryButtonText = "Reset";
  const newLightPrimaryButtonText = "Submit";
  const newLightSecondaryButtonText = "Cancel";

  // -------------- //
  // Event handlers //
  // -------------- //

  // Function that handles the submit event for content objects
  let handleClickSubmit = (event, fields) => {
    event.preventDefault();
    props.handleUpdateLight({
      Name: props.fields.Name,
      Update: { ...fields }
    });

    // api
    //   .addNewLight(submitFieldValues)
    //   .then((response) => {
    //     // console.log(response);
    //     props.handleUpdateList(response);
    //   })
    //   .catch((error) => {
    //     props.throwError(error.message);
    //   });
  };

  // Transforms field update event into lightUpdateObject to be consumed by Dashboard handleUpdateLight()
  // This is used to get the name of the device to update

  // --------------- //
  // Content Objects //
  // --------------- //

  // <AddContent /> is pulled from ./addButton.js

  // Shows a blank card with a loading animation
  const LoadContent = (props) => (
    <Box className={classes.loadingContainer}>
      <Box className={classes.loadingItem}>
        <CircularProgress />
      </Box>
    </Box>
  );

  // Shows a card with input fields populated based on the intersection of props.schema and props.fields
  const LightContent = (props) => (
    <Content
      new={props.new}
      fields={props.fields}
      schema={props.schema}
      handleClickSubmit={handleClickSubmit}
      primaryButtonText={
        props.new ? newLightPrimaryButtonText : existingLightPrimaryButtonText
      }
      secondaryButtonText={
        props.new
          ? newLightSecondaryButtonText
          : existingLightSecondaryButtonText
      }
    />
  );

  const ConditionalContent = (props) => {
    if (props.new && !props.fields)
      return <AddContent onClick={props.handleClickAdd} />;
    else if (!props.fields || !props.schema) return <LoadContent />;
    else return <LightContent {...props} />;
  };

  return (
    <Grid item className={classes.gridItem}>
      <Card className={classes.card}>
        <ConditionalContent
          new={props.new}
          handleClickAdd={props.handleClickAdd}
          fields={props.fields}
          schema={props.schema}
        />
      </Card>
    </Grid>
  );
};

export default Light;
