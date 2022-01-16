import React, { useState, useEffect } from 'react';
import { Typography, Box, Grid, TextField, Button } from '@mui/material';

function ProfileSettings({ vendorData }) {
  const vendor = vendorData;

  return (
    <Grid container spacing={2}>
      <Grid item md={12} xs={12}>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <TextField
              id="outlined-read-only-input"
              label="First Name"
              value={vendor.firstName}
              fullWidth
              inputProps={{
                readOnly: true,
              }}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              label="Last Name"
              value={vendor.lastName}
              fullWidth
              inputProps={{
                readOnly: true,
              }}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={12} xs={12}>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <TextField
              label="Email"
              value={vendor.email}
              fullWidth
              inputProps={{
                readOnly: true,
              }}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              label="Phone No"
              value={vendor.phoneNo}
              fullWidth
              inputProps={{
                readOnly: true,
              }}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={12} xs={12}>
        <Grid container spacing={2}>
          <Grid item md={12}>
            <Typography variant="h6">Change Pasword</Typography>
          </Grid>
          <Grid item md={6}>
            <TextField label="Current Password" fullWidth type="password" />
          </Grid>
          <Grid item md={6}>
            <TextField label="New Password" fullWidth type="password" />
          </Grid>
          <Grid item md={6}>
            <TextField label="Confirm Password" fullWidth type="password" />
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={12} xs={12}>
        <Button variant="outlined" color="primary">
          Save Changes
        </Button>
      </Grid>
    </Grid>
  );
}

export default ProfileSettings;
