import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Alert as MuiAlert,
  Snackbar,
} from '@mui/material';
import ReactCrop from 'react-image-crop';
import ImageCrop from '../../../components/imageCrop';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { baseURL } from '../../../configs/const';
import LoggedInVendor from '../../../layouts/LoggedInVendor';
import BackButton from '../../../components/backButton';
import { useMediaQuery } from 'react-responsive';
import { makeStyles } from '@mui/styles';
import SelectTheme from '../../../components/themeCustomize/selectTheme';
import { DateRangePickerDay } from '@mui/lab';

const useStyle = makeStyles(theme => ({
  modalBox: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '30%',
    // bgcolor: 'background.paper',
    backgroundColor: '#fff',
    border: '2px solid #000',
    boxShadow: 24,
    p: 0,
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
  },
  store_url: {
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      justifyContent: 'center',
    },
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
      marginBottom: '3rem',
    },
  },
}));

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function StoreSettings() {
  const classes = useStyle();
  const [storeId, setStoreId] = useState();
  const [storeAvatar, setStoreAvatar] = useState();
  const [storeLogo, setStoreLogo] = useState();
  const [openAvatarModal, setOpenAvatarModal] = useState(false);
  const [openLogoModal, setOpenLogoModal] = useState(false);
  const [themeColor, setThemeColor] = useState();
  const [originalThemeColor, setOriginalThemeColor] = useState();
  const [color, setColor] = useState();
  const [storeName, setStoreName] = useState();
  const [toggleStoreAvatarButton, setToggleStoreAvatarButton] = useState(false);
  const [toggleStoreLogoButton, setToggleStoreLogoButton] = useState(false);
  const [orignalStoreName, setOrignalStoreName] = useState();
  const [timer, setTimer] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const [images, setImages] = useState({
    coverAvatar: '',
    logo: '',
  });
  const [showImg, setShowImg] = useState({
    coverAvatar: '',
    logo: '',
  });

  const [snackBarToggle, setSnackBarToggle] = useState({
    visible: false,
    type: 'success',
    message: 'Message sent successfully',
  });
  let isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    fetchVendorStoreData();
  }, []);

  const fetchVendorStoreData = () => {
    console.log('vedor call');
    axios
      .get(`${baseURL}/store/`, {
        headers: {
          Authorization: localStorage.getItem('MERCHPAL_AUTH_TOKEN'),
        },
      })
      .then(res => {
        const vendorStore = res.data.store;
        console.log('vendorStore', vendorStore);
        setStoreName(vendorStore.name);
        setOrignalStoreName(vendorStore.name);
        setStoreAvatar(vendorStore.coverAvatar);
        setStoreLogo(vendorStore.logo);
        setColor(vendorStore.themeColor);
        setThemeColor(vendorStore.themeColor);
        setOriginalThemeColor(vendorStore.themeColor);
        setStoreId(vendorStore._id);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleOpenAvatarModal = () => setOpenAvatarModal(true);
  const handleCloseAvatarModal = () => setOpenAvatarModal(false);

  const handleOpenLogoModal = () => setOpenLogoModal(true);
  const handleCloseLogoModal = () => setOpenLogoModal(false);

  const handleStoreNameChange = e => {
    setErrorMessage('');
    setStoreName(e.target.value);
    clearTimeout(timer);

    if (orignalStoreName !== e.target.value) {
      const newTimer = setTimeout(() => {
        axios
          .post(`${baseURL}/store/validate-slug`, { storeName: e.target.value.trim() })
          .then(response => {
            setErrorMessage('');
          })
          .catch(err => {
            setErrorMessage(err.response.data.message);
          });
      }, 500);
      setTimer(newTimer);
    } else {
      setErrorMessage('Name same as previous');
    }
  };

  const handleChangeStoreAvatarButton = () => {
    handleOpenAvatarModal();
    setToggleStoreAvatarButton(!toggleStoreAvatarButton);
  };

  const handleChangeStoreLogoButton = () => {
    handleOpenLogoModal();
    setToggleStoreLogoButton(!toggleStoreLogoButton);
  };

  const setImage = async (name, file) => {
    setImages({ ...images, [name]: file });
    setShowImg({ ...showImg, [name]: URL.createObjectURL(file) });
  };

  const checkFieldsEmpty = () => {
    if (storeName !== '' || images.coverAvatar !== '' || images.logo !== '' || themeColor !== '') {
      return false;
    } else {
      return true;
    }
  };

  const handleUpdateStore = () => {
    const store = new FormData();
    store.append('storeId', storeId);
    store.append('name', storeName);
    store.append('coverAvatar', images.coverAvatar);
    store.append('logo', images.logo);
    store.append('themeColor', themeColor);

    console.log(
      'store update ',
      { store },
      storeId,
      storeName,
      images.coverAvatar,
      images.logo,
      themeColor,
    );
    if (storeId) {
      axios
        .put(`${baseURL}/store/update-store-data`, store, {
          headers: {
            Authorization: localStorage.getItem('MERCHPAL_AUTH_TOKEN'),
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(res => {
          setSnackBarToggle({
            visible: true,
            type: 'success',
            message: 'Store updated successfully',
          });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      console.log(
        'store update ',
        { store },
        storeId,
        storeName,
        images.coverAvatar,
        images.logo,
        themeColor,
      );
      const storeData = {
        name: storeName,
        // facebook: data.facebook,
        // instagram: data.instagram,
        // twitter: data.twitter,
        // products: JSON.stringify([...selectedVariants]),
        themeColor: themeColor,
        // designName: designData.front.designName,
      };
      axios
        .post(`${baseURL}/store`, storeData, {
          headers: {
            Authorization: localStorage.getItem('MERCHPAL_AUTH_TOKEN'),
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          localStorage.removeItem('design');
          localStorage.removeItem('selectedVariants');

          const urls = response.data.data.urls;

          const storeLogo = urls[0].imageUrl;
          const storeCoverAvatar = urls[1].imageUrl;

          postDataToURL(storeLogo, data.logo);
          postDataToURL(storeCoverAvatar, data.coverAvatar);
          nextStep();
          setShowWelcomeMessage(true);
        })
        .catch(err => {
          setCreateStoreError(true);
        });
    }
  };

  const handleSnackBarClose = () =>
    setSnackBarToggle({
      ...snackBarToggle,
      visible: false,
    });

  return (
    <LoggedInVendor>
      <BackButton />
      <Grid container spacing={2}>
        <Grid item md={2} xs={12}></Grid>
        <Grid item md={8} xs={12}>
          <Grid container spacing={2}>
            <Grid item md={12} xs={12} mb={4}>
              <Typography variant="h4" align="center">
                Store Settings
              </Typography>
            </Grid>
            <Grid container item md={12} xs={12} mb={1}>
              <Grid item containermd={6} xs={12} md={6} sm={6} className={classes.store_url}>
                <Typography variant="h6">Store URL:</Typography>
                <Box
                  sx={{
                    marginLeft: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box>
                    <Typography variant="p">Merchpals.com/</Typography>
                    <TextField
                      inputProps={{ maxLength: 15 }}
                      variant="standard"
                      onChange={handleStoreNameChange}
                      size="small"
                      value={storeName}
                      helperText={errorMessage}
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid container item xs={12} md={6} sm={6} spacing={2} justifyContent="center">
                <Typography variant="h5">Choose your theme</Typography>
                <SelectTheme setThemeColor={setThemeColor} color={color} setColor={setColor} />
              </Grid>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid container spacing={2}>
                <Grid
                  item
                  md={12}
                  xs={12}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <img
                    src={
                      showImg.coverAvatar
                        ? showImg.coverAvatar
                        : images.coverAvatar === ''
                        ? storeAvatar
                        : images.coverAvatar
                    }
                  />
                </Grid>
                <Grid
                  item
                  md={12}
                  xs={12}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Button onClick={handleChangeStoreAvatarButton} variant="contained">
                    Change Cover
                  </Button>
                </Grid>
                <Modal
                  open={openAvatarModal}
                  onClose={handleCloseAvatarModal}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box className={classes.modalBox}>
                    <ImageCrop
                      handleClose={handleCloseAvatarModal}
                      variant="storeAvatar"
                      setImage={setImage}
                    />
                  </Box>
                </Modal>
              </Grid>
            </Grid>
            <Grid
              mt={isMobile ? '1rem' : '0rem'}
              item
              md={6}
              xs={12}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Grid container spacing={2}>
                <Grid
                  item
                  md={12}
                  xs={12}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <img
                    src={showImg.logo ? showImg.logo : images.logo === '' ? storeLogo : images.logo}
                    style={{
                      width: '200px',
                      height: '200px',
                      borderRadius: '50%',
                    }}
                  />
                </Grid>
                <Grid
                  item
                  md={12}
                  xs={12}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Button onClick={handleChangeStoreLogoButton} variant="contained">
                    Change Logo
                  </Button>
                </Grid>
                <Modal
                  open={openLogoModal}
                  onClose={handleCloseLogoModal}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box className={classes.modalBox}>
                    <ImageCrop
                      handleClose={handleCloseLogoModal}
                      variant="storeLogo"
                      setImage={setImage}
                    />
                  </Box>
                </Modal>
              </Grid>
            </Grid>
            <Grid
              mt={isMobile ? '1rem' : '1.5rem'}
              item
              md={12}
              xs={12}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Button
                onClick={handleUpdateStore}
                variant="contained"
                disabled={
                  storeName === orignalStoreName &&
                  images.coverAvatar === '' &&
                  images.logo === '' &&
                  themeColor === originalThemeColor
                    ? true
                    : false
                }
              >
                Update Store
              </Button>
            </Grid>
          </Grid>
          <Grid item md={2} xs={12}></Grid>
        </Grid>
        <Snackbar
          open={snackBarToggle.visible}
          autoHideDuration={2000}
          onClose={handleSnackBarClose}
        >
          <Alert severity={snackBarToggle.type}>{snackBarToggle.message}</Alert>
        </Snackbar>
      </Grid>
    </LoggedInVendor>
  );
}

export default StoreSettings;
