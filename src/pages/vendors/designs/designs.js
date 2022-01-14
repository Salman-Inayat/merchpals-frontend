import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Button } from '@mui/material';
import axios from 'axios';
import LoggedInVendor from '../../../layouts/LoggedInVendor';
import { baseURL } from '../../../configs/const';

const VendorDesigns = () => {
  const navigate = useNavigate();

  useEffect(() => {
    getDesigns();
  }, []);

  const getDesigns = async () => {
    axios
      .get(`${baseURL}/store/designs`, {
        headers: {
          Authorization: localStorage.getItem('MERCHPAL_AUTH_TOKEN'),
        },
      })
      .then(response => console.log({ response }))
      .catch(error => console.log({ error }));
  };
  return (
    <LoggedInVendor>
      <Grid mt={5} container>
        <Grid justifyContent="flex-start" container>
          <Button onClick={() => navigate('/vendor/create-design')}>
            Add new Design
          </Button>
        </Grid>
      </Grid>
    </LoggedInVendor>
  );
};

export default VendorDesigns;
