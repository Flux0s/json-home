import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import { withSnackbar } from "notistack";

import { api } from "../helpers/api-service.js";
import Light from "./light";

const lights = [{ _id: -1 }];

class Dashboard extends Component {
  handleUpdateList = (newList) => {
    this.setState((currentState) => ({
      devices: [...currentState.devices, ...newList],
      lightSchema: {}
    }));
    // console.log("Updated list of devices: " + JSON.stringify(newList));
  };
  throwError = (errorMessage) => {
    this.props.enqueueSnackbar(errorMessage, {
      variant: "error",
      autoHideDuration: 3500
    });
  };
  constructor(props) {
    super(props);
    this.state = { devices: lights };
    api
      .getLights()
      .then((devices) => {
        this.setState({ devices: devices });
      })
      .catch((error) => {
        this.throwError(error.message);
      });
    api
      .getLightSchema()
      .then((schema) => {
        this.setState({ lightSchema: schema });
      })
      .catch((error) => {
        this.throwError(error.message);
      });
  }
  render() {
    // console.log(this.state.devices);
    return (
      /* <Box> */
      <Grid container direction='row' justify='center' alignItems='center'>
        <>
          {this.state.devices.map((device) => {
            return (
              <Light
                key={device._id}
                fields={{ ...device }}
                schema={this.state.lightSchema}
                handleUpdateList={this.handleUpdateList}
                throwError={this.throwError}
              />
            );
          })}
        </>
        <Light
          new
          schema={this.state.lightSchema}
          handleUpdateList={this.handleUpdateList}
          throwError={this.throwError}
        />
      </Grid>
      /* </Box> */
    );
  }
}

export default withSnackbar(Dashboard);
