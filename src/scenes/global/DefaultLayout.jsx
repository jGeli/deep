import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import Dashboard from "../dashboard";
import Team from "../team";
import Invoices from "../invoices";
import Contacts from "../contacts";
import Bar from "../bar";
import Form from "../form";
import Line from "../line";
import Pie from "../pie";
import FAQ from "../faq";
import Geography from "../geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../theme";
import Calendar from "../calendar/calendar";
import QrScanner from '../qrScanner';
import LoanManager from '../loan';
import { getAllRecords } from "../../redux/actions/Data";
import { useDispatch } from "react-redux";
import Genealogy from '../../components/tree-view'




function App() {
  const dispatch = useDispatch();
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selected, setSelected] = useState("Dashboard");

 


  return (
  
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} selected={selected} setSelected={setSelected} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} setIsCollapsed={() => setIsCollapsed(!isCollapsed)}  />
            <div onClick={() => setIsCollapsed(true)}>
               <Routes>
              <Route exact path="/" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/members" element={<Contacts />} />
              <Route path="/loan-manager" element={<LoanManager />} />
              <Route path="/genealogy" element={<Genealogy />} />
              <Route path="/qr-scanner" element={<QrScanner />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
             </Routes>
            </div>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
