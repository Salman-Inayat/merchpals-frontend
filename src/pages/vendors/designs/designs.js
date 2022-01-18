import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Button,
  Avatar,
  Box,
  Alert as MuiAlert,
  Snackbar,
} from '@mui/material';
import axios from 'axios';
import LoggedInVendor from '../../../layouts/LoggedInVendor';
import { baseURL } from '../../../configs/const';
import { makeStyles } from '@mui/styles';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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
  const [fetched, setFetched] = useState(false);
  const [snackBarToggle, setSnackBarToggle] = useState({
    visible: false,
    type: 'success',
    message: 'Design added successfully',
  });

  const classes = useStyle();
  const [designImage, setDesignImage] = useState([]);

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
      .then(response => {
        response.data.designs.map(design => {
          setDesignImage(prevState => [
            ...prevState,
            { id: design._id, url: design.url },
          ]);
        });
        setFetched(true);
        setDesigns(response.data.designs);
      })
      .catch(error => console.log({ error }));
  };

  const navigateToCreate = () => {
    if (designs.length === 5) {
      setSnackBarToggle({
        visible: true,
        type: 'error',
        message: 'Designs limit reached',
      });

      return;
    }
    navigate('/vendor/create-design');
  };

  const handleSnackBarClose = () =>
    setSnackBarToggle({
      ...snackBarToggle,
      visible: false,
    });
  return (
    <LoggedInVendor>
      <Grid mt={5} container>
        <Grid justifyContent="flex-start" container>
          {fetched && (
            <Button onClick={navigateToCreate}>Add new Design</Button>
          )}
        </Grid>
        <Grid colspacing={3} mt={5} container>
          {designs.map(design => (
            <Box className={classes.box}>
              {designImage.length > 0 && (
                <Avatar
                  src={designImage.find(image => image.id === design._id).url}
                  key={design._id}
                  variant="square"
                  className={classes.avatar}
                />
              )}
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
      <Snackbar
        open={snackBarToggle.visible}
        autoHideDuration={3000}
        onClose={handleSnackBarClose}
      >
        <Alert severity={snackBarToggle.type}>{snackBarToggle.message}</Alert>
      </Snackbar>
    </LoggedInVendor>
  );
};

export default VendorDesigns;
