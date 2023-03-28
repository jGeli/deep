import { Box, Button, InputAdornment, MenuItem, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { SET_MEMBER, SET_STUDENT } from "../../redux/actions/types";
import { createRecord, updateRecord } from "../../redux/actions/Data";
import { useState } from "react";
import { MembershipFee } from "../../utils/helpers";

import Autocomplete from '../../components/Autocomplete';

const Form = ({handleClose}) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { member } = useSelector(({dataReducer}) => dataReducer)
  const [errors, setErrors] = useState({
  })
  const dispatch = useDispatch()

  
  const handleChange = prop => e => {
    delete errors[prop]
  
    dispatch({type: SET_MEMBER, payload: {...member, [prop]: e.target.value}})
  };
  
  
  const handleSelect =  e => {
    delete errors['membershipFee']
    console.log(e)
    let pack = MembershipFee.find(a => a.value === e.target.value)
    console.log(pack)
    dispatch({type: SET_MEMBER, payload: {...member, membershipFee: pack.value, rank: pack.rank, status: pack.status }})
  };
  
  const handleDate = e => {
    dispatch({type: SET_MEMBER, payload: {...member, birthDate: e.target.value}})
  };
  
 
    
  const handleSubmit = (e) => {
    e.preventDefault();
    
    
    
    if(member.phone.length !== 10) return setErrors({phone: "Invalid format. Ex. 977XXXXXXX"})
    
    if(member._id){
      dispatch(updateRecord(member))
    } else {
      dispatch(createRecord(member))
    }
  }
  
  

  return (
    <Box m="20px">
      <Header title="NEW RECORD" subtitle="Create a New Member Profile" />

        <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="15px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                size="small"
                label="First Name"
                // onBlur={handleBlur}
                onChange={handleChange('firstName')}
                value={member.firstName}
                name="firstName"
                // error={!!touched.firstName && !!errors.firstName}
                // helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                size="small"
                label="Last Name"
                // onBlur={handleBlur}
                onChange={handleChange('lastName')}
                value={member.lastName}
                name="lastName"
                // error={!!touched.lastName && !!errors.lastName}
                // helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />
                     <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Home Address"
                size="small"
                // onBlur={handleBlur}
                onChange={handleChange('address')}
                value={member.address}
                name="address"
                // error={!!touched.lastName && !!errors.lastName}
                // helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 4" }}
              />
              
              <TextField
                fullWidth
                variant="filled"
                size="small"
                type="date"
                // onBlur={handleBlur}
                onChange={(e) => handleDate(e)}
                value={member.birthDate}
                name="birthDate"
                error={errors.birthDate && errors.birthDate}
                helperText={errors.birthDate ? errors.birthDate : "Birth Date"}
                sx={{ gridColumn: "span 2" }}
              />
                <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                size="small"
                // onBlur={handleBlur}
                onChange={handleChange('email')}
                value={member.email}
                name="email"
                // error={!!touched.email && !!errors.email}
                // helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 2" }}
              />
          
            
         
                  <TextField
                fullWidth
                variant="filled"
                size="small"
                type="text"
                label="Contact Number"
                // onBlur={handleBlur}
                onChange={handleChange('phone')}
                value={member.phone}
                name="phone"
                error={errors.phone && errors.phone}
                helperText={errors.phone ? errors.phone : "Ex: 9774461641"}
                InputProps={{
                  startAdornment: <InputAdornment position="start">+63</InputAdornment>,
                }}
                sx={{ gridColumn: "span 2" }}
              />
             <TextField
               fullWidth
               variant="filled"
               type="text"
               size="small"
          select
          label="Membership Fee"
          onChange={handleSelect}
          value={member.membershipFee}
          error={errors.membershipFee && errors.membershipFee}
          helperText={errors.membershipFee && errors.membershipFee }
          sx={{ gridColumn: "span 2" }}
          >
          {MembershipFee.map((option, index) => (
            <MenuItem key={index} value={option.value}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
             {/* <Autocomplete /> */}
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
            <Button size="small"
            color="secondary" variant="contained" onClick={() => handleClose()}>
               Close
              </Button>&nbsp;&nbsp;
              <Button size="small" type="submit" color="secondary" variant="contained">
              {member._id ? "Update" : "Save"}
              </Button>
            </Box>
          </form>
    </Box>
  );
};



export default Form;
