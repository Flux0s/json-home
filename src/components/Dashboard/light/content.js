import React, { useState } from "react";
import { makeStyles, Box, Button } from "@material-ui/core";

import { api } from "../../helpers/api-service";

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
  textbox: {
    margin: theme.spacing(1)
  },
  button: {
    marginLeft: theme.spacing(1)
  }
}));

function Content(props) {
  // Definition and initialization
  const classes = useStyles();
  const [fields, setFields] = useState(0);
  // setFields();

  // Event handlers
  let handleSubmit = (event) => {
    event.preventDefault();
    // let newLight = Object.keys(this.state)
    //   .filter((i) => this.state.lightProps.includes(i))
    //   .reduce((acc, key) => {
    //     acc[key] = this.state[key];
    //     return acc;
    //   }, {});
    console.log(fields);
    // api.addLight(device)
    //     .then((response) => {
    //         console.log(response);
    //     })
    //     .catch((error) => {
    //         this.props.enqueueSnackbar(error.message, {
    //             variant: "error",
    //             autoHideDuration: 4000
    //         });
    //     });
  };
  // if (!props.lightProps)
  //   api
  //     .getEmptyLight()
  //     .then((res) => {
  //       let newLight = {};
  //       res.forEach((prop) => (newLight[prop] = ""));
  //       this.setState({
  //         lightProps: res,
  //         ...newLight
  //       });
  //     })
  //     .catch((error) => {
  //       this.props.enqueueSnackbar(error.message, {
  //         variant: "error",
  //         autoHideDuration: 4000
  //       });
  //     });

  return (
    <form className={classes.parentBox} onSubmit={handleSubmit}>
      <Box className={classes.fieldContainer}></Box>
      <Box className={classes.buttonContainer}>
        <Button
          variant='outlined'
          /* onClick={() => this.setState({ active: false })} */
        >
          Cancel
        </Button>
        <Button
          type='submit'
          className={classes.button}
          variant='contained'
          color='primary'
        >
          Submit
        </Button>
      </Box>
    </form>
  );
}
export default Content;
