import React, { useState, useEffect } from 'react';
import { Typography, Box, Grid, TextField, Button } from '@mui/material';
import ReactCrop from 'react-image-crop';
import ImageCrop from '../../../components/imageCrop';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { baseURL } from '../../../configs/const';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function StoreSettings({ vendorStoreData }) {
  const vendorStore = vendorStoreData;
  const storeId = vendorStore._id;
  const [storeAvatar, setStoreAvatar] = useState(vendorStoreData.coverAvatar);
  const [storeLogo, setStoreLogo] = useState(vendorStoreData.logo);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [storeName, setStoreName] = useState(vendorStoreData.storeName);
  const [updatedStoreAvatar, setUpdatedStoreAvatar] = useState('');
  const [updatedStoreLogo, setUpdatedStoreLogo] = useState('');
  const [toggleStoreAvatarButton, setToggleStoreAvatarButton] = useState(false);
  const [toggleStoreLogoButton, setToggleStoreLogoButton] = useState(false);

  const handleStoreNameChange = e => {
    setStoreName(e.target.value);
  };

  const updateStoreName = () => {
    const data = {
      store: {
        storeName: storeName,
        storeId: storeId,
      },
    };

    console.log('Data: ', data);

    axios
      .post(`${baseURL}/store/update-store-name`, data, {
        headers: {
          Authorization: localStorage.getItem('MERCHPAL_AUTH_TOKEN'),
        },
      })
      .then(res => {
        console.log(res.data);
        alert('Store name updated successfully');
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleChangeStoreAvatarButton = () => {
    handleOpen();
    setToggleStoreAvatarButton(!toggleStoreAvatarButton);
  };

  const handleChangeStoreLogoButton = () => {
    handleOpen();
    setToggleStoreLogoButton(!toggleStoreLogoButton);
  };

  const handleStoreAvatarChange = value => {
    console.log(value);
    setStoreAvatar(value);
    setUpdatedStoreAvatar(value);
  };

  const handleStoreLogoChange = value => {
    setStoreLogo(value);
    setUpdatedStoreLogo(value);
  };

  const updateStoreAvatar = () => {
    const data = {
      store: {
        storeAvatar: updatedStoreAvatar,
        storeId: storeId,
      },
    };

    console.log('Data: ', data);

    axios
      .post(`${baseURL}/store/update-store-avatar`, data, {
        headers: {
          Authorization: localStorage.getItem('MERCHPAL_AUTH_TOKEN'),
        },
      })
      .then(res => {
        console.log(res.data);
        alert('Store avatar updated successfully');
      })
      .catch(err => {
        console.log(err);
      });
  };

  const updateStoreLogo = () => {
    const data = {
      store: {
        storeLogo: updatedStoreLogo,
        storeId: storeId,
      },
    };

    console.log('Data: ', data);

    axios
      .post(`${baseURL}/store/update-store-logo`, data, {
        headers: {
          Authorization: localStorage.getItem('MERCHPAL_AUTH_TOKEN'),
        },
      })
      .then(res => {
        console.log(res.data);
        alert('Store logo updated successfully');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <Grid container spacing={2}>
      <Grid item md={12} xs={12}>
        <Grid container spacing={2}>
          <Grid item md={12}>
            <Typography variant="h6">Store Name</Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box>
                <Typography variant="p">Merchpal/store/</Typography>
                <TextField
                  id="input-with-sx"
                  variant="standard"
                  onChange={handleStoreNameChange}
                  size="small"
                />
              </Box>
              <Button onClick={updateStoreName} variant="contained">
                Update Name
              </Button>
            </Box>
          </Grid>
          <Grid item md={12}>
            <Grid container>
              <Grid item md={6}>
                <img src={storeAvatar} />
              </Grid>
              <Grid item md={6}>
                {!toggleStoreAvatarButton ? (
                  <Button
                    onClick={handleChangeStoreAvatarButton}
                    variant="contained"
                  >
                    Change Store Avatar
                  </Button>
                ) : (
                  <Button onClick={updateStoreAvatar} variant="contained">
                    Update Store Avatar
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={12}>
            <Grid container>
              <Grid item md={6}>
                <img src={storeLogo} />
              </Grid>
              <Grid item md={6}>
                {!toggleStoreLogoButton ? (
                  <Button
                    onClick={handleChangeStoreLogoButton}
                    variant="contained"
                  >
                    Update Store Logo
                  </Button>
                ) : (
                  <Button onClick={updateStoreLogo} variant="contained">
                    Update Store Logo
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={12}>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <ImageCrop
                  handleClose={handleClose}
                  handleStoreAvatarChange={handleStoreAvatarChange}
                  handleStoreLogoChange={handleStoreLogoChange}
                />
              </Box>
            </Modal>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default StoreSettings;
