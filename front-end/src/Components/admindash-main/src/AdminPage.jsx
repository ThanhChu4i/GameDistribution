import { useState } from "react";
import { Box } from "@mui/material";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes, Route } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from 'axios';
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
import Calendar from "./scenes/calendar/calendar";

function AdminPage() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const navigate = useNavigate();

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const token = Cookies.get('token'); // Lấy token từ cookie
                await axios.get('http://localhost:8081/admin', {
                    headers: {
                        Authorization: `Bearer ${token}` // Đính kèm token vào header
                    }
                });
            } catch (error) {
                console.error('Error fetching admin data:', error);
                // Chuyển hướng về trang khác nếu không có quyền truy cập
                navigate('/'); // Hoặc chuyển hướng đến một trang khác phù hợp
            }
        };

        fetchAdminData();
    }, [navigate]);
  return (
    <Box Display = "flex" >
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/Admin" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
    </Box>
  );
}

export default AdminPage;
