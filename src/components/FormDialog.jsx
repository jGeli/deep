import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormContent from '../scenes/form';
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_MEMBERFORM, SET_MEMBER } from '../redux/actions/types';


export default function FormDialog({open, setOpen}) {
    const dispatch = useDispatch()
    
    
    


  const handleClose = () => {
    dispatch({type: CLOSE_MEMBERFORM})
    dispatch({type: SET_MEMBER, payload: {}})
  };
 

  return (
    <div>
      <Dialog 
              fullWidth
              maxWidth="sm"
      open={open} 
      // onClose={handleClose}
      >
        <DialogContent>
        <FormContent handleClose={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
