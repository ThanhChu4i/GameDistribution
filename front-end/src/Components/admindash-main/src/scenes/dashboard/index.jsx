import { useEffect, useState } from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import axios from "axios";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import PersonIcon from '@mui/icons-material/Person';
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import Cookies from 'js-cookie';
const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
          const token = Cookies.get('token');
          if (!token) {
            throw new Error('No token found');
          }
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin/stats`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!stats) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={(stats.totalUsers ?? 0).toLocaleString()}
            subtitle="Total Users"
            progress={stats?.recentUsers && stats?.totalUsers ? 1- stats.recentUsers / stats.totalUsers : 0}
            increase={stats?.recentUsers && stats?.totalUsers 
              ? ((1 - stats.recentUsers / stats.totalUsers) * 100).toFixed(2) + "%" 
              : "0%"}
            icon={
              <PersonIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={(stats.recentUsers ?? 0).toLocaleString()}
            subtitle="New Users"
            progress={stats?.recentUsers && stats?.totalUsers ? stats.recentUsers / stats.totalUsers : 0}
            increase={stats?.recentUsers && stats?.totalUsers 
              ? ((stats.recentUsers / stats.totalUsers) * 100).toFixed(2) + "%" 
              : "0%"}
            
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={(stats.totalGames ?? 0).toLocaleString()}
            subtitle="Total Games"
            progress={stats?.recentGames && stats?.totalGames ? 1- stats.recentGames / stats.totalGames : 0}
            increase={stats?.recentGames && stats?.totalGames 
              ? ((1 - stats.recentGames / stats.totalGames) * 100).toFixed(2) + "%" 
              : "0%"}
            
            icon={
              <SportsEsportsIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={(stats.recentGames ?? 0).toLocaleString()}
            subtitle="New Games"
            progress={stats?.recentGames && stats?.totalGames ? stats.recentGames / stats.totalGames : 0}
            increase={stats?.recentGames && stats?.totalGames 
              ? ((stats.recentGames / stats.totalGames) * 100).toFixed(2) + "%" 
              : "0%"}
            
            icon={
              <SportsEsportsIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Revenue Generated
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                ${stats.revenue?.toLocaleString() ?? "0"}
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            User play game last 30 day
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" 
            progress={stats?.recentHistory && stats?.totalHistory ? stats.recentHistory / stats.totalHistory : 0}/>
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
              progress={stats?.recentGames && stats?.totalGames ? stats.recentGames / stats.totalGames : 0}
            >
              {(stats.recentHistory ?? 0).toLocaleString()} / {(stats.totalHistory ?? 0).toLocaleString()}
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Sales Quantity
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geography Based Traffic
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
