import React from "react";
import {
  Typography,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  Dialog,
  DialogTitle
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const DeleteDialog = (props) => {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
        {"Delete "}
        <Typography variant='overline'>{props.lightName}</Typography> {"?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {"Are you sure you want to delete "}
          <Typography variant='overline'>{props.lightName}</Typography>
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
