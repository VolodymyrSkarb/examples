import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const AlertDialog = ({dialogState, switchDialogState, dialogText = '', dialogTitle = '', confirmDialog, allowToConfirm = true}: {
  dialogState: boolean,
  switchDialogState: Function,
  dialogText?: string,
  dialogTitle?: string,
  confirmDialog: Function,
  allowToConfirm?: boolean,
})=> {
  const [open, setOpen] = useState(dialogState);
  const isAllow = allowToConfirm;

  const handleClose = () => {
    setOpen(false);
    switchDialogState();
  };

  useEffect(() => {
    setOpen(dialogState);
  }, [dialogState]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {dialogTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button disabled={!isAllow} onClick={() => confirmDialog()} autoFocus>
          Confirm
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertDialog;