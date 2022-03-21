import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Button,
  Avatar,
  Box,
  Alert as MuiAlert,
  Snackbar,
  Card,
  CardMedia,
  CardActions,
} from '@mui/material';
import axios from 'axios';
import LoggedInVendor from '../../../layouts/LoggedInVendor';
import { baseURL } from '../../../configs/const';
import { makeStyles } from '@mui/styles';
import BackButton from '../../../components/backButton';
import { useMediaQuery } from 'react-responsive';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const useStyle = makeStyles(theme => ({
  designContainer: {
    padding: '1rem 3rem',
    [theme.breakpoints.down('sm')]: {
      padding: '0rem',
    },
  },
  card: {
    borderRadius: '10px',
  },
  designImage: {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
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
  let isMobile = useMediaQuery({ maxWidth: 767 });
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
        const designs = response.data.designs;
        designs.map(design => {
          setDesignImage(prevState => [
            ...prevState,
            { id: design._id, url: design.frontDesign.designImages[4].imageUrl },
          ]);
        });
        setFetched(true);
        setDesigns(response.data.designs);
      })
      .catch(error => console.log({ error }));
  };
  const navigateToCreate = () => {
    if (designs.length == 10) {
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
      <Grid mt={5} container className={classes.designContainer}>
        <Grid
          item
          md={12}
          mb={2}
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <BackButton />
          {fetched ? (
            <Button onClick={navigateToCreate} variant="contained" size="medium">
              Add new Design
            </Button>
          ) : (
            <Button onClick={() => navigate('/vendor/store')} variant="contained" size="medium">
              Create a Store
            </Button>
          )}
        </Grid>
        <Grid item md={12}>
          <Grid container spacing={isMobile ? 2 : 4}>
            {designs.map((design, index) => (
              <Grid item md={3} xs={6} key={index}>
                <Card className={classes.card}>
                  {designImage.length > 0 && (
                    <CardMedia
                      component="img"
                      src={designImage.find(image => image.id === design._id).url}
                      height="80%"
                      key={design._id}
                      variant="square"
                      className={classes.designImage}
                    />
                  )}
                  <CardActions className={classes.buttonsContainer}>
                    <Button
                      variant="outlined"
                      className={classes.btn}
                      onClick={() => navigate(`/vendor/edit-design/${design._id}`)}
                      size="small"
                    >
                      Edit Design
                    </Button>
                    <Button
                      variant="outlined"
                      className={classes.btn}
                      onClick={() => navigate(`/vendor/edit-design/products/${design._id}`)}
                      size="small"
                    >
                      Edit Products
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Snackbar open={snackBarToggle.visible} autoHideDuration={3000} onClose={handleSnackBarClose}>
        <Alert severity={snackBarToggle.type}>{snackBarToggle.message}</Alert>
      </Snackbar>
    </LoggedInVendor>
  );
};
export default VendorDesigns;
