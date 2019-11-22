import React, { Component } from "react";
import { Box, Grid } from "@material-ui/core";
import { withSnackbar } from "notistack";

import { api } from "../helpers/api-service.js";
import Light from "./light";

const lights = [
  {
    id: 1
  },
  {
    id: 2
  },
  {
    id: 3
  }
];

class Dashboard extends Component {
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
    return (
      <Box>
        <Grid container direction='row' justify='center' alignItems='center'>
          <>
            {this.state.devices.map((device) => {
              return <Light key={device.id} fields={{ ...device }} />;
            })}
          </>
          <Light
          /* new */
          />
        </Grid>
      </Box>
    );
  }
}

export default withSnackbar(Dashboard);
