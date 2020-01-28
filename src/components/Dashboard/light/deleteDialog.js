import React from "react";
import {
  Typography,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  Dialog,
  DialogTitle,
  makeStyles
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const useStyles = makeStyles((theme) => ({
  codeText: {
    borderRadius: "5px",
    border: "1px solid #d7d9da",
    backgroundColor: "#d7d9da",
    padding: "2px"
  }
}));

const DeleteDialog = (props) => {
  const classes = useStyles();
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
        {"Delete "}
        <code variant='p1' className={classes.codeText}>
          {props.lightName}
        </code>
        {"?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {"Are you sure you want to delete "}
          <code variant='p1' className={classes.codeText}>
            {props.lightName}
          </code>
          {" forever? You will not be able to restore it if you do."}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color='primary'>
          Cancel
        </Button>
        <Button onClick={props.handleConfirmDelete} autoFocus>
          <DeleteForeverIcon color='error' />
          <Typography color='error' variant='button'>
            Delete
          </Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
