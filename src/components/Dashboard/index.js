import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import { withSnackbar } from "notistack";

import { api } from "../helpers/api-service.js";
import Light from "./light";
// import { JsonWebTokenError } from "jsonwebtoken";

const lights = [{ _pageId: 0 }];

class Dashboard extends Component {
  // -------------- //
  // Initialization //
  // -------------- //

  constructor(props) {
    super(props);
    this.state = { devices: lights, newLightFields: undefined };
    api
      .getLights()
      .then((devices) => {
        Object.keys(devices).forEach((device, i) => {
          devices[device]._pageId = i;
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

  // -------------- //
  // Event handlers //
  // -------------- //

  handleUpdateList = (newList) => {
    this.setState((currentState) => ({
      devices: [...currentState.devices, ...newList],
      lightSchema: {}
    }));
  };

  handleUpdateLight = (lightUpdateObject) => {
    this.setState((prevState) => {
      let newState = prevState,
        lightStateIndex = newState.devices.findIndex((light) => {
          return light.Name === lightUpdateObject.Name;
        });
      if (lightStateIndex === -1) {
        this.throwError(
          "Error: attempted to update a device that doesn't exist!"
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
      return api
        .updateExistingLight(newState.devices[lightStateIndex])
        .then(() => newState)
        .catch((error) => this.throwError(error.message));
    });
  };

  handleSubmitNewLight = (newLight) => {
    api
      .addNewLight(newLight)
      .then((response) => {
        this.handleUpdateList(response);
      })
      .catch((error) => {
        this.throwError(error.message);
      });
  };

  handleClickAdd = () => {
    api
      .getEmptyLight()
      .then((res) => {
        this.setState({ newLightFields: { ...res, _pageId: -1 } });
      })
      .catch((error) => this.throwError(error.message));
  };

  handleCancelAdd = () => {
    this.setState({ newLightFields: undefined });
  };

  handleConfirmDelete = (id) => {
    // TODO: Need to call the api method for light deletion here
    api.deleteExistingLight(id).then(() => {
      this.setState((prevState) => {
        let newState = prevState;
        newState.devices = prevState.devices.filter(
          (light) => light._id !== id
        );
        return newState;
      });
    });
  };

  // ---------------- //
  // Helper Functions //
  // ---------------- //

  throwError = (errorMessage) => {
    this.props.enqueueSnackbar(errorMessage, {
      variant: "error",
      autoHideDuration: 3000
    });
  };

  // --------------- //
  // Render Function //
  // --------------- //

  render() {
    return (
      <Grid container direction='row' justify='center' alignItems='center'>
        <>
          {this.state.devices.map((device) => {
            return (
              <Light
                key={device._pageId}
                fields={{ ...device }}
                schema={this.state.lightSchema}
                handleUpdateLight={this.handleUpdateLight}
                handleConfirmDelete={this.handleConfirmDelete}
              />
            );
          })}
        </>
        <Light
          new
          fields={this.state.newLightFields}
          schema={this.state.lightSchema}
          handleClickAdd={this.handleClickAdd}
          handleCancelAdd={this.handleCancelAdd}
          handleUpdateLight={this.handleUpdateLight}
          handleSubmitNewLight={this.handleSubmitNewLight}
        />
      </Grid>
    );
  }
}

export default withSnackbar(Dashboard);
