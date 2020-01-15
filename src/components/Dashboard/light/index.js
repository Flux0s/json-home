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
// import { api } from "../../helpers/api-service";

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
  console.log("Rendering Light!");
  const classes = useStyles();
  // Set the content object to one of the following states: add new device, loading from server, editable content object
  // let [ContentObject, setContentObject] = useState(() => {
  //   if (props.new) return <AddContent onClick={revealAddFields} />;
  //   else if (!props.fields.Name || !props.schema)
  //     return (
  //       <Box className={classes.loadingContainer}>
  //         <Box className={classes.loadingItem}>
  //           <CircularProgress />
  //         </Box>
  //       </Box>
  //     );
  //   else
  //     return (
  //       <Content
  //         fields={fields}
  //         schema={props.schema}
  //         handleUpdate={handleUpdateField}
  //         primaryButtonText={"Update"}
  //         secondaryButtonText={"Reset"}
  //       />
  //     );
  // });

  // Allows add objects to return to unrevealed state
  function handleCancelAdd() {
    // setContentObject(<AddContent onClick={revealAddFields} />);
  }
  // Function that handles the submit event for content objects
  let handleSubmit = (event, submitFieldValues) => {
    event.preventDefault();
    // console.log(event);
    if (submitFieldValues._id) console.log("Update requested!");
    // else
    //   api
    //     .addNewLight(submitFieldValues)
    //     .then((response) => {
    //       // console.log(response);
    //       props.handleUpdateList(response);
    //     })
    //     .catch((error) => {
    //       props.throwError(error.message);
    //     });
  };
  // Requests an empty light object via API and creates a content object based on response
  // console.log(JSON.stringify(props));
  function revealAddFields() {
    // console.log(JSON.stringify(props));
    // Set to loading while processing the API call
    // setContentObject(
    //   <Box className={classes.loadingContainer}>
    //     <Box className={classes.loadingItem}>
    //       <CircularProgress />
    //     </Box>
    //   </Box>
    // );
    // api
    //   .getEmptyLight()
    //   .then((res) => {
    //     // Create a content object based on reply
    //     // console.log(JSON.stringify(props.schema));
    //     setContentObject(
    //       <Content
    //         fields={res}
    //         schema={props.schema}
    //         handleUpdate={handleUpdateField}
    //         handleCancelAdd={handleCancelAdd}
    //         handleSubmit={handleSubmit}
    //         primaryButtonText={"Add"}
    //         secondaryButtonText={"Cancel"}
    //       />
    //     );
    //   })
    //   .catch((error) => {
    //     props.throwError(error.message);
    //   });
  }

  //
  //
  // New implementation
  //
  //

  // -------------- //
  // Event handlers //
  // -------------- //

  // Transforms field update event into lightUpdateObject to be consumed by Dashboard handleUpdateLight()
  // This is used to get the name of the device to update
  function handleUpdateField(event) {
    let field = event.target.id,
      value = event.target.value,
      update = {};
    update[field] = value;
    props.handleUpdateLight({
      Name: props.fields.Name,
      Update: { ...update }
    });
  }

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
      fields={props.fields}
      schema={props.schema}
      handleUpdate={handleUpdateField}
      primaryButtonText={"Update"}
      secondaryButtonText={"Reset"}
    />
  );

  const ConditionalContent = (props) => {
    if (props.new) return <AddContent onClick={revealAddFields} />;
    else if (!props.fields || !props.schema) return <LoadContent />;
    else return <LightContent {...props} />;
  };

  return (
    <Grid item className={classes.gridItem}>
      <Card className={classes.card}>
        <ConditionalContent
          new={props.new}
          fields={props.fields}
          schema={props.schema}
        />
      </Card>
    </Grid>
  );
};

export default Light;
