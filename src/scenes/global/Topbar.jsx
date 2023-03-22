import { Box, IconButton, useTheme } from "@mui/material";
import { useContext, useEffect } from "react";
import { ColorModeContext, tokens } from "../../theme";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { OPEN_MEMBERFORM } from "../../redux/actions/types";

const Topbar = ({setIsCollapsed}) => {
  const theme = useTheme();
  const { memberForm } = useSelector(({uiReducer}) => uiReducer);
  const dispatch = useDispatch()
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  let {pathname} = useLocation();
    
      
      useEffect(() => {
          localStorage.setItem("theme", theme.palette.mode)
      }, [theme.palette.mode])

    
    console.log(pathname)
  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
   
        {/* <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton> */}
              <Box
              display="flex"
              backgroundColor={colors.primary[400]}
              borderRadius="3px"
                // ml="15px"
              >
                {/* <Typography variant="h3" color={colors.grey[100]}>
                  ADMINS
                </Typography> */}
                <IconButton onClick={setIsCollapsed}
            
                >
                  <MenuOutlinedIcon />
                </IconButton>
                {/* <FormGroup>
                   <FormControlLabel control={<Switch color="secondary" checked={isFlush} onChange={() => dispatch({type: SET_FLUSH, payload: !isFlush})} />} label="Flash" />
                </FormGroup> */}
              </Box>

      {/* ICONS */}
      <Box display="flex" >
      
      <IconButton onClick={() => dispatch({type: OPEN_MEMBERFORM})}>
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
