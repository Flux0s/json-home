import React from "react";
import { makeStyles, Box, Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  BackgroundBox: {
    "background-color": theme.palette.grey[200],
    width: "inherit",
    height: "100%",
    display: "flex",
    flexFlow: "column"
  },
  addIconButton: {
    margin: "auto",
    width: "inherit",
    flex: " 1 auto"
  },
  addIcon: {
    width: "35%",
    height: "35%"
  }
}));

function AddButton(props) {
  const classes = useStyles();
  return (
    <Box className={classes.BackgroundBox}>
      <Button
        aria-label='add'
        size='large'
        className={classes.addIconButton}
        onClick={props.onClick}
      >
        <AddIcon className={classes.addIcon} />
      </Button>
    </Box>
  );
}

export default AddButton;
