import React, { Component } from 'react';
import { Card, withStyles, Grid } from '@material-ui/core';
import ContentLight from './ContentLight';
import NewLight from './NewLight';

const styles = (theme) => ({
  card: {
    [theme.breakpoints.down('xs')]: {
      height: '450px',
      width: '100%'
    },
    [theme.breakpoints.up('sm')]: {
      height: '450px',
      width: '400px'
    },
    [theme.breakpoints.up('md')]: {
      height: '300px',
      width: '500px'
    }
  },
  gridItem: {
    margin: theme.spacing(1)
  }
});

class Light extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.type
    };
  }
  render() {
    const { classes } = this.props;
    let DeviceDisplay;
    if (this.state.type === 'content') {
      DeviceDisplay = <Content {...this.props.device} />;
    } else if (this.state.type === 'new') {
      DeviceDisplay = <NewLight />;
    }
    return (
      <Grid item className={classes.gridItem}>
        <Card className={classes.card}>{DeviceDisplay}</Card>
      </Grid>
    );
  }
}

export default withStyles(styles)(Light);
