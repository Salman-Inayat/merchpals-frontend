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
  width: '50%',
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
  const [openAvatarModal, setOpenAvatarModal] = useState(false);
  const [openLogoModal, setOpenLogoModal] = useState(false);

  const [storeName, setStoreName] = useState(vendorStore.storeName);
  const [updatedStoreAvatar, setUpdatedStoreAvatar] = useState('');
  const [updatedStoreLogo, setUpdatedStoreLogo] = useState('');
  const [toggleStoreAvatarButton, setToggleStoreAvatarButton] = useState(false);
  const [toggleStoreLogoButton, setToggleStoreLogoButton] = useState(false);

  const [updatedData, setUpdatedData] = useState({
    name: vendorStore.name,
    coverAvatar: vendorStore.coverAvatar,
    logo: vendorStore.logo,
  });

  const handleOpenAvatarModal = () => setOpenAvatarModal(true);
  const handleCloseAvatarModal = () => setOpenAvatarModal(false);

  const handleOpenLogoModal = () => setOpenLogoModal(true);
  const handleCloseLogoModal = () => setOpenLogoModal(false);

  const handleStoreNameChange = e => {
    setStoreName(e.target.value);
    setUpdatedData({ ...updatedData, name: e.target.value });
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
    setUpdatedStoreAvatar(value);
  };

  const handleStoreLogoChange = value => {
    setUpdatedData({ ...updatedData, logo: value });
    setStoreLogo(value);
    setUpdatedStoreLogo(value);
  };

  const handleUpdateStore = () => {
    const data = {
      store: {
        storeData: updatedData,
        storeId: storeId,
      },
    };

    console.log('Data: ', data);

    axios
      .post(`${baseURL}/store/update-store-data`, data, {
        headers: {
          Authorization: localStorage.getItem('MERCHPAL_AUTH_TOKEN'),
        },
      })
      .then(res => {
        console.log(res.data);
        alert('Store data updated successfully');
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
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <img src={storeAvatar} />
              </Grid>
              <Grid
                item
                md={12}
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
                <Box sx={style}>
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
                <Box sx={style}>
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
            item
            md={12}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Button onClick={handleUpdateStore} variant="contained">
              Update Store
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default StoreSettings;
