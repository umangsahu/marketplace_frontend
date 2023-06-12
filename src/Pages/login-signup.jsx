import React, { useEffect, useState } from 'react'
import "../styles/loginSignup.css"
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SignIn from '../components/Login';
import SignUp from '../components/signup';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
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
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
  export default function BasicTabs({Data}) {
    const [value, setValue] = React.useState(0);
    const [currentTab,setCurrentTab]=useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    useEffect(()=>{
       setValue(currentTab)
    },[currentTab])
  
    return (

      <>
   
        <div className="auth">
      <Box sx={{ width: '1024px',margin:"20px auto" }} >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Login" {...a11yProps(0)} />
            <Tab label="Signup" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
        <SignIn tabChange={setCurrentTab}/>
        </TabPanel>
        <TabPanel value={value} index={1}>
        <SignUp tabChange={setCurrentTab} />
        </TabPanel>
       
      </Box>
      </div>
      </>
    );
  }
