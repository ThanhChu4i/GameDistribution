import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types'
import './Adminsetting.css';
import { Link } from "react-router-dom";
import AdminSettingGame from "./Adminsettinggame";
import AdminSettinguser from "./Adminsettinguser";
import Typography from '@mui/material/Typography';
function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }
  
  export default function VerticalTabs() {
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
    <div className="setting-container">
    <div className="button-back">
    <Link to="/Admin" style={{ textDecoration: 'none' }}> 
      {/* Đảm bảo không có gạch chân bằng cách thêm textDecoration: 'none' */}
      <Button variant="contained" color="primary">
        Go to Dashboard
      </Button>
    </Link>
     </div>
         <Box
        sx={{ height: 900, flexGrow: 1, bgcolor: 'background.paper', display: 'flex'}}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ width: 90,  borderRight: 1, borderColor: 'divider' }}
        >
          <Tab label="Users Setting" {...a11yProps(0)} />
          <Tab label="Games Setting" {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={value} index={0}>
         <AdminSettinguser/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <AdminSettingGame/>
        </TabPanel>
      </Box>
      </div>
    );
  }
   
     