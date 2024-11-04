import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material'; // Import Button if using Material-UI
//import './Setting.css'; // Assuming you have a CSS file for styling

const Setting = () => {
    return (
        <div className='Setting'>
            <Button className='btu' variant="contained" color="primary">
                <Link to='/Admin/Setting/User' style={{ textDecoration: 'none', color: 'white' }}>
                    User
                </Link>
            </Button>
            <Button className='btu' variant="contained" color="primary">
                <Link to='/Admin/Setting/Game' style={{ textDecoration: 'none', color: 'white' }}>
                    Game
                </Link>
            </Button>
        </div>
    );
};

export default Setting;
