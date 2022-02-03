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
  const [storeName, setStoreName] = useState();
  const [toggleStoreAvatarButton, setToggleStoreAvatarButton] = useState(false);
  const [toggleStoreLogoButton, setToggleStoreLogoButton] = useState(false);
  const [vendorStoreData, setVendorStoreData] = useState({});
  const [updatedData, setUpdatedData] = useState({
    name: '',
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
    axios
      .get(`${baseURL}/store/`, {
        headers: {
          Authorization: localStorage.getItem('MERCHPAL_AUTH_TOKEN'),
        },
      })
      .then(res => {
        const vendorStore = res.data.store;
        setVendorStoreData(vendorStore);
        setStoreName(vendorStore.name);
        setStoreAvatar(vendorStore.coverAvatar);
        setStoreLogo(vendorStore.logo);
        setUpdatedData({
          name: vendorStore.name,
          coverAvatar: vendorStore.coverAvatar,
          logo: vendorStore.logo,
        });
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
    setStoreName(e.target.value.replace(/\s/g, '-'));
    setUpdatedData({
      ...updatedData,
      name: e.target.value.replace(/\s/g, '-'),
    });
  };

  const handleChangeStoreAvatarButton = () => {
    handleOpenAvatarModal();
    setToggleStoreAvatarButton(!toggleStoreAvatarButton);
  };

  const handleChangeStoreLogoButton = () => {
    handleOpenLogoModal();
    setToggleStoreLogoButton(!toggleStoreLogoButton);
  };

  const handleStoreAvatarChange = value => {
    setUpdatedData({ ...updatedData, coverAvatar: value });

    setStoreAvatar(value);
  };

  const handleStoreLogoChange = value => {
    setUpdatedData({ ...updatedData, logo: value });
    setStoreLogo(value);
  };

  const handleUpdateStore = () => {
    const data = {
      store: {
        storeData: updatedData,
        storeId: storeId,
      },
    };
    data.store.storeData.themeColor = themeColor;
    console.log('Data: ', data);

    axios
      .post(`${baseURL}/store/update-store-data`, data, {
        headers: {
          Authorization: localStorage.getItem('MERCHPAL_AUTH_TOKEN'),
        },
      })
      .then(res => {
        console.log(res.data);
        setSnackBarToggle({
          visible: true,
          type: 'success',
          message: 'Store updated successfully',
        });
      })
      .catch(err => {
        console.log(err);
      });
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
              <Grid item md={6}>
                <Typography variant="h6">Store URL</Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box>
                    <Typography variant="p">Merchpals.com/</Typography>
                    <TextField
                      id="input-with-sx"
                      variant="standard"
                      onChange={handleStoreNameChange}
                      size="small"
                      value={storeName}
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid container item md={6} spacing={2}>
                <SelectTheme setThemeColor={setThemeColor} />
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
                  <img src={storeAvatar} />
                </Grid>
                <Grid
                  item
                  md={12}
                  xs={12}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Button
                    onClick={handleChangeStoreAvatarButton}
                    variant="contained"
                  >
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
                      handleStoreAvatarChange={handleStoreAvatarChange}
                      variant="storeAvatar"
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
                    src={storeLogo}
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
                  <Button
                    onClick={handleChangeStoreLogoButton}
                    variant="contained"
                  >
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
                      handleStoreLogoChange={handleStoreLogoChange}
                      variant="storeLogo"
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
              <Button onClick={handleUpdateStore} variant="contained">
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
