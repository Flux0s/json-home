import React, { Component } from "react";
import { Card, Grid, makeStyles } from "@material-ui/core";
import Content from "./content";

const useStyles = makeStyles((theme) => ({
  card: {
    width: "100%",
    height: "100%"
  },
  gridItem: {
    [theme.breakpoints.down("xs")]: {
      margin: theme.spacing(4),
      height: "450px",
      width: "100%"
    },
    [theme.breakpoints.up("sm")]: {
      margin: theme.spacing(2),
      height: "450px",
      width: "350px"
    },
    [theme.breakpoints.up("md")]: {
      margin: theme.spacing(2),
      height: "450px",
      width: "425px"
    },
    [theme.breakpoints.up("lg")]: {
      marginTop: theme.spacing(6, 4),
      height: "450px",
      width: "450px"
    }
  }
}));

function Light(props) {
  const classes = useStyles();
  function test(props) {
    if (props.new) return <div> new </div>;
    else return <Content {...props.fields} />;
  };
  return (
    <Grid item className={classes.gridItem}>
      <Card className={classes.card}>

      </Card>
    </Grid>
  );
}

export default Light;
