import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseURL } from '../../../configs/const';
import LoggedInVendor from '../../../layouts/LoggedInVendor';
import { Tabs, Tab, Typography, Box, Grid } from '@mui/material';
import ProfileSettings from './profileSettings';
import StoreSettings from './storeSettings';

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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function Settings() {
  const [value, setValue] = React.useState(0);
  const [vendorData, setVendorData] = useState({});
  const [vendorStoreData, setVendorStoreData] = useState({});

  useEffect(() => {
    fetchVendorStoreData();
    fetchVendorData();
  }, []);

  const fetchVendorData = () => {
    axios
      .get(`${baseURL}/vendor/profile`, {
        headers: {
          Authorization: localStorage.getItem('MERCHPAL_AUTH_TOKEN'),
        },
      })
      .then(res => {
        setVendorData(res.data.vendor);
        console.log(res.data.vendor);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const fetchVendorStoreData = () => {
    axios
      .get(`${baseURL}/store/`, {
        headers: {
          Authorization: localStorage.getItem('MERCHPAL_AUTH_TOKEN'),
        },
      })
      .then(res => {
        setVendorStoreData(res.data.store);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <LoggedInVendor>
      <Grid container>
        <Grid item md={2} xs={12}></Grid>
        <Grid item md={8} xs={12}>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                variant="fullWidth"
              >
                <Tab label="Profile Settings" {...a11yProps(0)} />
                <Tab label="Store Settings" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              {vendorData && <ProfileSettings vendorData={vendorData} />}
            </TabPanel>
            <TabPanel value={value} index={1}>
              {vendorStoreData && (
                <StoreSettings vendorStoreData={vendorStoreData} />
              )}
            </TabPanel>
          </Box>
        </Grid>
        <Grid item md={2} xs={12}></Grid>
      </Grid>
    </LoggedInVendor>
  );
}

export default Settings;
