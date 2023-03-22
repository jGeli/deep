import { Box, Button, MenuItem, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { SET_MEMBER, SET_STUDENT } from "../../redux/actions/types";
import { createRecord } from "../../redux/actions/Data";
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
    dispatch({type: SET_MEMBER, payload: {...member, [prop]: e.target.value}})
  };
  
  const handleSelect = e => {
  console.log(e)
    dispatch({type: SET_MEMBER, payload: {...member, birthDate: e.target.value}})
  };
  
 
    
  const handleSubmit = (e) => {
    e.preventDefault();
    if(member.contact.length < 12) return setErrors({contact: "Please enter in this format +639xx"})
    
    
    dispatch(createRecord(member))
    .then(() => {
      handleClose()
    })
    console.log(member)
  }
  
  
  
  
  console.log(member)

  return (
    <Box m="20px">
      <Header title="NEW RECORD" subtitle="Create a New Member Profile" />

        <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
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
                type="text"
                label="Email"
                // onBlur={handleBlur}
                onChange={handleChange('email')}
                value={member.email}
                name="email"
                // error={!!touched.email && !!errors.email}
                // helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                // onBlur={handleBlur}
                onChange={handleChange('contact')}
                value={member.contact}
                name="contact"
                error={errors.contact && errors.contact}
                helperText={errors.contact ? errors.contact : "Ex: 639774461641"}
                sx={{ gridColumn: "span 4" }}
              />
                <TextField
                fullWidth
                variant="filled"
                type="date"
                // onBlur={handleBlur}
                onChange={(e) => handleSelect(e)}
                value={member.birthDate}
                name="birthDate"
                error={errors.birthDate && errors.birthDate}
                helperText={errors.birthDate ? errors.birthDate : "Enter Birth Date"}
                sx={{ gridColumn: "span 4" }}
              />
             
             <TextField
               fullWidth
               variant="filled"
               type="text"
          select
          label="Membership Fee"
          onChange={handleChange('membershipFee')}
          value={member.membershipFee}
          error={errors.membershipFee && errors.membershipFee}
          helperText={errors.membershipFee && errors.membershipFee }
          sx={{ gridColumn: "span 4" }}
          >
          {MembershipFee.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
             <Autocomplete />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
            <Button color="secondary" variant="contained" onClick={() => handleClose()}>
               Close
              </Button>&nbsp;&nbsp;
              <Button type="submit" color="secondary" variant="contained">
                Save
              </Button>
            </Box>
          </form>
    </Box>
  );
};



export default Form;
