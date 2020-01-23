import React from "react";
import {
  Menu,
  MenuItem,
  Zoom,
  Typography,
  makeStyles
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const useStyles = makeStyles((theme) => ({
  deleteIcon: {
    color: theme.palette.error.main,
    paddingRight: theme.spacing(1)
  },
  deleteText: {
    color: theme.palette.error.main
  }
}));

const OptionsMenu = (props) => {
  const classes = useStyles();

  return (
    <Menu
      id={props.id + "_settings"}
      anchorEl={props.anchorEl}
      keepMounted
      open={props.open}
      onClose={props.handleClose}
      TransitionComponent={Zoom}
    >
      <MenuItem onClick={props.handleClickDelete}>
        <DeleteForeverIcon className={classes.deleteIcon} />
        <Typography className={classes.deleteText}>Delete</Typography>
      </MenuItem>
    </Menu>
  );
};

export default OptionsMenu;
