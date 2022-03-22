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
  Typography,
} from '@mui/material';
import axios from 'axios';
import LoggedInVendor from '../../../layouts/LoggedInVendor';
import { baseURL } from '../../../configs/const';
import { makeStyles } from '@mui/styles';
import BackButton from '../../../components/backButton';
import { useMediaQuery } from 'react-responsive';
import EditDesign from './edit/products';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const useStyle = makeStyles(theme => ({
  designContainer: {
    padding: '1rem 3rem',
    maxWidth: '800px',
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
      padding: '0rem',
    },
  },
  dContainer: {
    [theme.breakpoints.down('sm')]: {
      maxWidth: '70px',
    },
  },

  card: {
    borderRadius: '10px',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100px',
    },
  },
  designImage: {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
  },
  selected: {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
    padding: '.4rem',
    backgroundColor: '#116dff',
  },
  selectedButton: {
    position: 'absolute',
    bottom: '.4rem',
    left: '.4rem',
    right: '.4rem',
    zIndex: '500',
    paddingTop: '.4rem',
    paddingBottom: '.4rem',
    backgroundColor: 'black',
    color: 'white',
    fontWeight: '600',
  },
  addButton: {
    height: '50px',
    with: '50px',
    fontSize: '24px',
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
}));

const VendorDesigns = ({ ndesigns, designImage, activeDesign, setDesign = () => {} }) => {
  const navigate = useNavigate();
  const [designs, setDesigns] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [snackBarToggle, setSnackBarToggle] = useState({
    visible: false,
    type: 'success',
    message: 'Design added successfully',
  });
  const classes = useStyle();
  // const [designImage, setDesignImage] = useState([]);
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
            {
              id: design._id,
              url:
                design?.frontDesign?.designImages[4]?.imageUrl ||
                design?.backDesign?.designImages[1]?.imageUrl,
            },
          ]);
        });
        setFetched(true);
        setDesigns(response.data.designs);
      })
      .catch(error => console.log({ error }));
  };
  const navigateToCreate = () => {
    if (designs.length >= 5) {
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

  // console.log(fetched)
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
        ></Grid>
        <Grid item md={12}>
          <Typography marginBottom={2} align="center" variant="h3">
            Designs & Prices
          </Typography>
          <Grid container spacing={isMobile ? 2 : 4}>
            {ndesigns.map((design, index) => (
              <Grid item md={3} xs={6} key={index}>
                <Button
                  className={classes.btn}
                  // onClick={() => navigate(`/vendor/edit-design/${design._id}`)}
                  // () => setDesign(design)
                  onClick={
                    activeDesign === design._id
                      ? () => navigate(`/vendor/edit-design/${design._id}`)
                      : () => setDesign(design)
                  }
                  size="small"
                >
                  {designImage.length > 0 && (
                    <CardMedia
                      component="img"
                      src={designImage.find(image => image.id === design._id).url}
                      height="80%"
                      key={design._id}
                      variant="square"
                      className={
                        activeDesign === design._id ? classes.selected : classes.designImage
                      }
                    />
                  )}
                  {activeDesign === design._id && (
                    <Typography className={classes.selectedButton}>Edit</Typography>
                  )}
                </Button>
              </Grid>
            ))}
            {ndesigns && (
              // <Grid  item md={3} xs={6}>
              <Card
                className={classes.card}
                style={{
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '5rem',
                }}
              >
                <Button
                  className={classes.addButton}
                  onClick={navigateToCreate}
                  variant="contained"
                  size="medium"
                >
                  +
                </Button>
              </Card>
              // </Grid>
            )}
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
