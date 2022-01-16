import React, { useState, useEffect } from 'react';
import { Typography, Box, Grid, TextField, Button } from '@mui/material';
import ReactCrop from 'react-image-crop';
import ImageCrop from '../../../components/imageCrop';
import Modal from '@mui/material/Modal';

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
  const [storeAvatar, setStoreAvatar] = useState(vendorStoreData.coverAvatar);
  const [storeLogo, setStoreLogo] = useState(vendorStoreData.logo);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Grid container spacing={2}>
      <Grid item md={12} xs={12}>
        <Grid container spacing={2}>
          <Grid item md={12}>
            <Typography variant="h6">Store Name</Typography>
            <TextField
              id="outlined-read-only-input"
              label="Store Name"
              value={vendorStore.storeName}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item md={12}>
            <Grid container>
              <Grid item md={6}>
                <img src={storeAvatar} />
              </Grid>
              <Grid item md={6}>
                <Button onClick={handleOpen}>Update Store Avatar</Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={12}>
            <Grid container>
              <Grid item md={6}>
                <img src={storeLogo} />
              </Grid>
              <Grid item md={6}>
                <Button onClick={handleOpen}>Update Store Logo</Button>
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
                <ImageCrop />
                <Button>Crop</Button>
                <Button onClick={handleClose}>Cancel</Button>
              </Box>
            </Modal>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default StoreSettings;
