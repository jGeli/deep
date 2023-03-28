import { Box, IconButton, useTheme } from "@mui/material";
import { useContext, useEffect } from "react";
import { ColorModeContext, tokens } from "../../theme";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { OPEN_MEMBERFORM, SET_FILTER } from "../../redux/actions/types";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";

const Topbar = ({setIsCollapsed}) => {
  const theme = useTheme();
  const { memberForm, filter } = useSelector(({uiReducer}) => uiReducer);
  const dispatch = useDispatch()
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
		
	function handleChange(e) {
	console.log(e)
	dispatch({type: SET_FILTER, payload: e.target.value})
	}
      const handleForm = () => {
        dispatch({type: OPEN_MEMBERFORM})
      }
      
      
      
      useEffect(() => {
          localStorage.setItem("theme", theme.palette.mode)
      }, [theme.palette.mode])

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
    <Box display="flex" >
       <Box
              backgroundColor={colors.primary[400]}
              borderRadius="3px"
             
              >
              <IconButton onClick={setIsCollapsed}
            >
              <MenuOutlinedIcon />
            </IconButton>
              </Box>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
           ml="15px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" onChange={(e) => handleChange(e)} />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>
      </Box>

      {/* ICONS */}
      <Box display="flex" >
      
      <IconButton onClick={() => handleForm()}>
          <PersonAddIcon />
        </IconButton>
       <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon  />
          )}
        </IconButton>
         
        {/* <IconButton>
          <NotificationsIcon />
        </IconButton> */}
        {/* <IconButton>
          <SettingsOutlinedIcon />
        </IconButton> */}
        {/* <IconButton
            component={Link}
            to={ pathname === '/qr-scanner' ? "/" : "/qr-scanner"}
        >
        { pathname === '/qr-scanner' ? <HomeOutlinedIcon/> : <QrCodeScannerIcon/> }
        </IconButton> */}
      </Box>
    </Box>
  );
};

export default Topbar;
