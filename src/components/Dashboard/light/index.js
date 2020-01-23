import React from "react";
import {
  Card,
  Grid,
  makeStyles,
  CircularProgress,
  Box,
  IconButton
} from "@material-ui/core";
import MoreVert from "@material-ui/icons/MoreVert";

import { default as LightContent } from "./content";
import { default as AddContent } from "./addButton";
import OptionsMenu from "./optionsMenu";
import DeleteDialog from "./deleteDialog";

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
  },
  contentBox: {
    // width: "100%",
    display: "flex",
    flexFlow: "column",
    height: "100%"
  },
  deleteButtonContainer: {
    flex: "0 1 auto",
    textAlign: "right"
  }
}));

const Light = (props) => {
  // -------------- //
  // Initialization //
  // -------------- //

  const classes = useStyles();
  const [optionsOpen, setOptionsoptionsOpen] = React.useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const buttonRef = React.useRef();
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
    if (!props.new)
      props.handleUpdateLight({
        Name: props.fields.Name,
        Update: { ...fields }
      });
    else {
      props.handleSubmitNewLight(fields);
    }
  };
  let handleClickMore = (event) => {
    setOptionsoptionsOpen(true);
  };
  let handleCloseOptions = () => {
    setOptionsoptionsOpen(false);
  };
  let handleClickDelete = () => {
    setOptionsoptionsOpen(false);
    setDeleteDialogOpen(true);
  };
  let handleCloseDelete = () => {
    setDeleteDialogOpen(false);
  };
  let handleConfirmDelete = () => {
    setDeleteDialogOpen(false);
    props.handleConfirmDelete(props.fields._id);
  };
  let handleMouseIn = () => {
    setHover(true);
  };
  let handleMouseOut = () => {
    setHover(false);
  };

  // --------------- //
  // Content Objects //
  // --------------- //

  // Shows a blank card with a loading animation
  const LoadContent = (props) => (
    <Box className={classes.loadingContainer}>
      <Box className={classes.loadingItem}>
        <CircularProgress />
      </Box>
    </Box>
  );

  const ConditionalContent = (props) => {
    if (props.new && !props.fields)
      return <AddContent onClick={props.handleClickAdd} />;
    else if (!props.fields || !props.schema) return <LoadContent />;
    else
      return (
        <Box className={classes.contentBox}>
          <Box
            className={classes.deleteButtonContainer}
            style={{ display: props.new ? "none" : "unset" }}
          >
            <IconButton
              onClick={handleClickMore}
              ref={buttonRef}
              style={{ visibility: !hover ? "hidden" : "visible" }}
            >
              <MoreVert fontSize='inherit' />
            </IconButton>
            <OptionsMenu
              anchorEl={() => buttonRef.current}
              open={optionsOpen}
              handleClose={handleCloseOptions}
              handleClickDelete={handleClickDelete}
            />
            <DeleteDialog
              handleClose={handleCloseDelete}
              handleConfirmDelete={handleConfirmDelete}
              lightName={props.fields.Name}
              open={deleteDialogOpen}
            />
          </Box>
          <LightContent {...props} />
        </Box>
      );
  };

  // --------------- //
  // Render Function //
  // --------------- //

  return (
    <Grid
      item
      className={classes.gridItem}
      onMouseEnter={handleMouseIn}
      onMouseLeave={handleMouseOut}
    >
      <Card className={classes.card}>
        <ConditionalContent
          new={props.new}
          handleClickSubmit={handleClickSubmit}
          handleClickAdd={props.handleClickAdd}
          handleCancelAdd={props.handleCancelAdd}
          fields={props.fields}
          schema={props.schema}
          primaryButtonText={
            props.new
              ? newLightPrimaryButtonText
              : existingLightPrimaryButtonText
          }
          secondaryButtonText={
            props.new
              ? newLightSecondaryButtonText
              : existingLightSecondaryButtonText
          }
        />
      </Card>
    </Grid>
  );
};

export default Light;
