import React, { Component } from 'react';
import {
  withStyles,
  CardContent,
  Button,
  Box,
  Grid,
  CircularProgress
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import css from './device.module.css';
import { withSnackbar } from 'notistack';

import { api } from '../../helpers/api-service';

const styles = (theme) => ({
  addDeviceCard: {
    height: '100%',
    width: '100%',
    'text-align': 'center',
    display: 'flex'
  },
  BackgroundBox: {
    'background-color': theme.palette.grey[200],
    width: 'inherit'
  },
  addIconButton: {
    margin: 'auto',
    width: 'inherit',
    height: '100%'
  },
  addIcon: {
    width: '30%',
    height: '30%'
  },
  activeButton: {
    margin: theme.spacing(0, 0, 0, 1)
  }
});
class NewDevice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      lightTemplate: null
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // api.addDevice(device)
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

  render() {
    const MUIstyles = this.props.classes;
    const classes = { ...css, ...MUIstyles };
    let content;

    if (this.state.active) {
      content = (
        <Box className={classes.parent}>
          <Box className={classes.content} />
          <Box className={classes.footer}>
            <form onSubmit={this.handleSubmit}>
              <Button
                className={classes.activeButton}
                variant='outlined'
                onClick={() => this.setState({ active: false })}
              >
                Cancel
              </Button>
              <Button
                type='submit'
                className={classes.activeButton}
                variant='contained'
                color='primary'
              >
                Submit
              </Button>
            </form>
          </Box>
        </Box>
      );
    } else {
      content = (
        <Box className={classes.BackgroundBox}>
          <Button
            aria-label='add'
            size='large'
            className={classes.addIconButton}
            onClick={() => {
              if (!this.state.lightTemplate)
                api
                  .getEmptyLight()
                  .then((res) => {
                    this.setState({ lightTemplate: res });
                  })
                  .catch((error) => {
                    this.props.enqueueSnackbar(error.message, {
                      variant: 'error',
                      autoHideDuration: 4000
                    });
                  });
              this.setState({ active: true });
            }}
          >
            <AddIcon className={classes.addIcon} />
          </Button>
        </Box>
      );
    }
    return (
      <CardContent className={classes.addDeviceCard} style={{ padding: '0px' }}>
        {content}
      </CardContent>
    );
  }
}

export default withSnackbar(withStyles(styles)(NewDevice));
