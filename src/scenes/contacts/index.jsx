import { useEffect, useState } from "react";
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import QrCode from "../../components/QrCode";
import FormDialog from '../../components/FormDialog';
//Redux
import { useDispatch, useSelector } from "react-redux";
import { OPEN_MEMBERFORM, SET_MEMBER, SET_TREE_VIEW } from "../../redux/actions/types";
import AltRouteIcon from '@mui/icons-material/AltRoute';
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import Genealogy from '../../components/tree-view'


const Contacts = () => {
  const dispatch = useDispatch()
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {members} = useSelector(({dataReducer}) => dataReducer)
  const {treeView} = useSelector(({uiReducer}) => uiReducer)
  const [selected, setSelected] = useState(null);

  const columns = [
    {
      field: "firstName",
      headerName: "First Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "lastName",
      headerName: "Last Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    { field: "membershipFee", headerName: "Membership" },
    { field: "createdAt", headerName: "Created Date" }
  ];

  const handleClick = (e) => {
    setSelected(e.row)
    console.log(e)
    dispatch({type: SET_MEMBER, payload: e.row})
    dispatch({type: OPEN_MEMBERFORM})
  }
  
  
	const handleChange = (event, newAlignment) => {
		dispatch({ type: SET_TREE_VIEW, payload: newAlignment ? newAlignment : treeView === 'dnd' ? "route" : "dnd"})
	}	
		

  
  return (
    <Box m="20px">
    <Box display="flex" justifyContent="space-between" alignItems="flex-start">
    <Header
        title="MEMBERS"
        subtitle="List of Members Details"
      />
      	<ToggleButtonGroup
			      color="primary"
			      value={treeView}
			      exclusive
			      size='small'
			      onChange={handleChange}
			      aria-label="Platform"
			    >
			         <ToggleButton value="dnd"><ContactsOutlinedIcon  fontSize='small' color={treeView === 'dnd' ? 'secondary' : ""}/></ToggleButton>
			      <ToggleButton value="route"><AltRouteIcon fontSize='small' color={treeView === 'route' ? 'secondary' : ""}/></ToggleButton>
			 
			    </ToggleButtonGroup>
    </Box>
  {treeView === 'dnd' ? 
      <Box
        m="20px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={members}
          columns={columns}
          density="compact"
          components={{ Toolbar: GridToolbar }}
          disableDensitySelector={true}
          onRowClick={handleClick}
        />
      </Box>
      : 
      
      <Box><Genealogy/></Box>
    }
    
    
    </Box>
  );
};

export default Contacts;
