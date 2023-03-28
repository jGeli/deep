import { useState, useEffect, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { getAllRecords } from "./redux/actions/Data";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from './scenes/global/DefaultLayout'
import LoginPage from './scenes/Auth/LoginPage'
import Snackbar from './components/Snackbar';
import { getUserData } from "./redux/actions/Auth";
import FormDialog from "./components/FormDialog";
import { CLOSE_MEMBERFORM } from "./redux/actions/types";

const token = localStorage.idToken;


const ProtectedRoute = ({ isAuthUser, children }) => {
  if (!token && !isAuthUser) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};


const PublicRoute = ({ isAuthUser, children }) => {

  if (isAuthUser) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const dispatch = useDispatch();
  const { isAuthUser } = useSelector(({auth}) => auth);
  const { memberForm } = useSelector(({uiReducer}) => uiReducer);
  const [theme, colorMode] = useMode();
  const colorModes = useContext(ColorModeContext);



  useEffect(() => {
    const idToken = localStorage.idToken;

  if(idToken){
    dispatch(getUserData());
    dispatch(getAllRecords());

  }
  colorModes.toggleColorMode();
  
  
  }, [isAuthUser])
  console.log(colorMode)
  return (
  
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
          <Snackbar/>
          <FormDialog open={memberForm} />
          <header id="header" >

               <Routes>
               {/* <Route path="*" element={<ProtectedRoute isAuthUser={isAuthUser}>
                    <DefaultLayout/>              
                </ProtectedRoute>}  /> */}
              <Route path="*" element={<ProtectedRoute isAuthUser={isAuthUser}>
                    <DefaultLayout/>              
                </ProtectedRoute>}  />
              <Route path="/signin" element={<PublicRoute isAuthUser={isAuthUser}>
                    <LoginPage/>              
                </PublicRoute>} />
             </Routes>
             </header>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
