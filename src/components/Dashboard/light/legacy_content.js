import React, { Component } from 'react';
import {
  withStyles,
  CardContent,
  Button,
  Box,
  TextField,
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
  },
  textField: {
    margin: theme.spacing(1, 3)
  }
});
class NewDevice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      lightProps: null,
      newLight: {}
    };
  }

  handleUpdate = (event) => {
    let id = event.target.id,
      update = {},
      value = event.target.value;
    update[id] = value;
    this.setState((prevState) => ({ ...update }));
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let newLight = Object.keys(this.state)
      .filter((i) => this.state.lightProps.includes(i))
      .reduce((acc, key) => {
        acc[key] = this.state[key];
        return acc;
      }, {});
    console.log(newLight);
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

  render() {
    const MUIstyles = this.props.classes;
    const classes = { ...css, ...MUIstyles };
    let content, formInputs;

    if (this.state.lightProps)
      formInputs = (
        <>
          {this.state.lightProps.map((input) => {
            return (
              <TextField
                required
                id={input}
                label={input}
                className={classes.textField}
                margin='normal'
                value={this.state[input]}
                onChange={this.handleUpdate}
                key={input}
              />
            );
          })}
        </>
      );
    else formInputs = <CircularProgress />;

    if (this.state.active) {
      content = (
        <Box className={classes.parent}>
          <form onSubmit={this.handleSubmit}>
            <Box className={classes.content}>{formInputs}</Box>
            <Box className={classes.footer}>
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
            </Box>
          </form>
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
              if (!this.state.lightProps)
                api
                  .getEmptyLight()
                  .then((res) => {
                    let newLight = {};
                    res.forEach((prop) => (newLight[prop] = ''));
                    this.setState({
                      lightProps: res,
                      ...newLight
                    });
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
