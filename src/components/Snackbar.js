import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { useDispatch, useSelector } from 'react-redux';
import { CLEAR_ERRORS, CLEAR_MESSAGE } from '../redux/actions/types';
import { useState } from 'react';
import { useEffect } from 'react';
import { Alert } from '@mui/material';

export default function PositionedSnackbar() {
const { snackbar, errors } = useSelector(({uiReducer}) => uiReducer);
const dispatch = useDispatch();




  const handleClose = () => {
    dispatch({type: CLEAR_ERRORS})
    dispatch({type: CLEAR_MESSAGE})
  };
  
  console.log(snackbar)
  console.log(errors)

  return (
    <div>
    {snackbar.open &&
      <Snackbar
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
        autoHideDuration={3000}
        open={snackbar.open}
        onClose={handleClose}
      >
      <Alert onClose={handleClose} severity={snackbar.type ? snackbar.type : ""} sx={{ width: '100%' }}>
   {snackbar.message}
  </Alert>
      </Snackbar>}
    </div>
  );
}