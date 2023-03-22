import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { SET_MEMBER } from '../redux/actions/types';

export default function ComboBox() {
    const dispatch = useDispatch()
    const { members, member } = useSelector(({dataReducer}) => dataReducer)

    const handleChange = (val) => {
        dispatch({type: SET_MEMBER, payload: {...member, parent: val}})
    }
    
    
        console.log(members)
    
  return (
    <Autocomplete
      id="combo-box-demo"
      options={members}
      fullWidth
      value={member.parent}
      onChange={(event, newValue) => {
        handleChange(newValue);
      }}
      getOptionLabel={(option) => option.firstName + ' ' + option.lastName}
      sx={{ gridColumn: "span 4" }}
      renderInput={(params) => <TextField 
               fullWidth
               variant="filled"
               type="text"
      {...params} label="Direct Upline" 
      />}
    />
  );
}

