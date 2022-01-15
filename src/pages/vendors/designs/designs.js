import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Button, Avatar, Box } from '@mui/material';
import axios from 'axios';
import LoggedInVendor from '../../../layouts/LoggedInVendor';
import { baseURL } from '../../../configs/const';
import { makeStyles } from '@mui/styles';

const useStyle = makeStyles(() => ({
  avatar: {
    width: '250px',
    height: '250px',
  },
  box: {
    marginLeft: '20px',
  },
  btn: {
    width: '100%',
    marginTop: '10px',
  },
}));

const VendorDesigns = () => {
  const navigate = useNavigate();
  const [designs, setDesigns] = useState([]);
  const classes = useStyle();

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
      .then(response => setDesigns(response.data.designs))
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
        <Grid colspacing={3} mt={5} container>
          {designs.map(design => (
            <Box className={classes.box}>
              <Avatar
                src={design.url}
                key={design._id}
                variant="square"
                className={classes.avatar}
              />
              <Button
                variant="outlined"
                className={classes.btn}
                onClick={() => navigate(`/vendor/edit-design/${design._id}`)}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                className={classes.btn}
                onClick={() =>
                  navigate(`/vendor/edit-design/products/${design._id}`)
                }
              >
                Edit Products
              </Button>
            </Box>
          ))}
        </Grid>
      </Grid>
    </LoggedInVendor>
  );
};

export default VendorDesigns;
