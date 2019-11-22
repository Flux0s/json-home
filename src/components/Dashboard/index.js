import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import { withSnackbar } from "notistack";

import { api } from "../helpers/api-service.js";
import Light from "./light";

const lights = [{}];

class Dashboard extends Component {
  handleUpdateList = (newList) => {
    this.setState((currentState) => ({
      devices: [...currentState.devices, ...newList]
    }));
    // console.log("Updated list of devices: " + JSON.stringify(newList));
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
        this.props.enqueueSnackbar(error.message, {
          variant: "error",
          autoHideDuration: 3500
        });
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
                handleUpdateList={this.handleUpdateList}
              />
            );
          })}
        </>
        <Light new handleUpdateList={this.handleUpdateList} />
      </Grid>
      /* </Box> */
    );
  }
}

export default withSnackbar(Dashboard);
