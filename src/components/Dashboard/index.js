import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import { withSnackbar } from "notistack";

import { api } from "../helpers/api-service.js";
import Light from "./light";
// import { JsonWebTokenError } from "jsonwebtoken";

const lights = [{ _id: -1 }];

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { devices: lights, newLightFields: undefined };
    api
      .getLights()
      .then((devices) => {
        Object.keys(devices).forEach((device, i) => {
          devices[device]._id = i;
        });
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

  handleUpdateList = (newList) => {
    this.setState((currentState) => ({
      devices: [...currentState.devices, ...newList],
      lightSchema: {}
    }));
    // console.log("Updated list of devices: " + JSON.stringify(newList));
  };

  handleUpdateLight = (lightUpdateObject) => {
    this.setState((prevState) => {
      let newState = prevState,
        lightStateIndex = newState.devices.findIndex((light) => {
          return light.Name === lightUpdateObject.Name;
        });
      if (lightStateIndex === -1) {
        this.throwError(
          "Error: attempted to update a field on a device that doesn't exist!"
        );
        return prevState;
      }
      Object.keys(lightUpdateObject.Update)
        .filter((key) => key in prevState.devices[lightStateIndex])
        .forEach(
          (key) =>
            (newState.devices[lightStateIndex][key] =
              lightUpdateObject.Update[key])
        );
      return newState;
    });
  };

  // Requests an empty light object via API and creates a content object based on response
  // console.log(JSON.stringify(props));
  handleClickAdd = () => {
    // console.log(JSON.stringify(props));
    api
      .getEmptyLight()
      .then((res) => {
        console.log(this.state);
        this.setState({ newLightFields: res });
      })
      .catch((error) => {
        this.throwError(error.message);
      });
  };

  throwError = (errorMessage) => {
    this.props.enqueueSnackbar(errorMessage, {
      variant: "error",
      autoHideDuration: 3500
    });
  };

  render() {
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
                handleUpdateLight={this.handleUpdateLight}
                handleUpdateList={this.handleUpdateList}
                throwError={this.throwError}
              />
            );
          })}
        </>
        <Light
          new
          fields={this.state.newLightFields}
          schema={this.state.lightSchema}
          handleUpdateList={this.handleUpdateList}
          handleClickAdd={this.handleClickAdd}
          throwError={this.throwError}
        />
      </Grid>
      /* </Box> */
    );
  }
}

export default withSnackbar(Dashboard);
