
import { Box } from "@mui/material";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes, Route } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from 'axios';
import Topbar from "./scenes/global/Topbar";
import Dashboard from "./scenes/dashboard";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

function AdminPage() {
  const [theme, colorMode] = useMode();
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
        navigate('/404/NotFound'); // Hoặc chuyển hướng đến một trang khác phù hợp
      }
    };

    fetchAdminData();
  }, [navigate]);
  return (
    <Box Display="flex" >
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <main className="content">
              <Topbar />
              <Routes>
                <Route path="/" element={<Dashboard />} />

              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </Box>
  );
}

export default AdminPage;
