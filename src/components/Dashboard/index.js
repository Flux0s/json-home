import React, { Component } from 'react';
import { Box, Grid } from '@material-ui/core';
import { withSnackbar } from 'notistack';

import { api } from '../helpers/api-service.js';
import Light from './light';

const lights = [
  {
    id: 1,
    name: '',
    description: ''
  },
  {
    id: 2,
    name: '',
    description: ''
  },
  {
    id: 3,
    name: '',
    description: ''
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
          variant: 'error',
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
              return <Light type='content' key={device.id} device={device} />;
            })}
          </>
          <Light type='new' />
        </Grid>
      </Box>
    );
  }
}

export default withSnackbar(Dashboard);
