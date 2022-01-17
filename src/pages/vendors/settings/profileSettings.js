import React, { useState, useEffect } from 'react';
import { Typography, Box, Grid, TextField, Button } from '@mui/material';
import axios from 'axios';
import { baseURL } from '../../../configs/const';

function ProfileSettings({ vendorData }) {
  const vendor = vendorData;
  const [toggleChangePassword, setToggleChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatched, setPasswordsMatched] = useState(false);
  const [firstname, setFirstname] = useState(vendor.firstName);
  const [lastname, setLastname] = useState(vendor.lastName);

  useEffect(() => {
    setFirstname(vendor.firstName);
    setLastname(vendor.lastName);
  }, []);

  const handleCurrentPasswordSubmit = () => {
    const data = {
      currentPassword: currentPassword,
    };

    axios
      .post(`${baseURL}/vendor/profile/match-password`, data, {
        headers: {
          Authorization: localStorage.getItem('MERCHPAL_AUTH_TOKEN'),
        },
      })
      .then(res => {
        console.log(res.data);
        if (res.data.isPasswordmatched == true) {
          setToggleChangePassword(true);
        } else {
          console.log('password not matched');
          setPasswordError('Password entered is incorrect');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handlePasswordChange = () => {
    const match = checkIfPasswordsMatch();
    if (match == true) {
      const data = {
        newPassword: newPassword,
      };
      axios
        .post(`${baseURL}/vendor/profile/update-password`, data, {
          headers: {
            Authorization: localStorage.getItem('MERCHPAL_AUTH_TOKEN'),
          },
        })
        .then(res => {
          alert('Password changed successfully');
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      alert('Passwords do not match');
    }
  };

  const checkIfPasswordsMatch = () => {
    if (newPassword === confirmPassword) {
      setPasswordsMatched(true);
      return true;
    } else {
      setPasswordsMatched(false);
      return false;
    }
  };

  const habdleFirstNameChange = e => {
    setFirstname(e.target.value);
  };

  const handleLastNameChange = e => {
    setLastname(e.target.value);
  };

  const updateName = () => {
    const data = {
      name: {
        firstName: firstname,
        lastName: lastname,
      },
    };
    axios
      .post(`${baseURL}/vendor/profile/update-name`, data, {
        headers: {
          Authorization: localStorage.getItem('MERCHPAL_AUTH_TOKEN'),
        },
      })
      .then(res => {
        alert('Name updated successfully');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <Grid container spacing={2}>
      <Grid item md={12} xs={12}>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <TextField
              id="outlined-read-only-input"
              label="First Name"
              value={firstname}
              fullWidth
              InputLabelProps={{ shrink: true }}
              onChange={habdleFirstNameChange}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              label="Last Name"
              value={lastname}
              fullWidth
              InputLabelProps={{ shrink: true }}
              onChange={handleLastNameChange}
            />
          </Grid>
          <Grid item md={12}>
            <Button onClick={updateName} variant="contained">
              Update name
            </Button>
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
              disabled
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              label="Phone No"
              value={vendor.phoneNo}
              fullWidth
              disabled
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
          {!toggleChangePassword && (
            <Grid item md={6}>
              <TextField
                label="Current Password"
                fullWidth
                type="password"
                onChange={e => setCurrentPassword(e.target.value)}
                helperText={passwordError}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleCurrentPasswordSubmit}
                style={{ marginTop: '15px' }}
              >
                Submit
              </Button>
            </Grid>
          )}
          {toggleChangePassword && (
            <Grid item md={6}>
              <Grid container spacing={2}>
                <Grid item md={12} mb={2}>
                  <TextField
                    label="New Password"
                    fullWidth
                    type="password"
                    onChange={e => {
                      setNewPassword(e.target.value);
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item md={12} mb={2}>
                  <TextField
                    label="Confirm Password"
                    fullWidth
                    type="password"
                    onChange={e => {
                      setConfirmPassword(e.target.value);
                    }}
                    helperText={
                      !passwordsMatched ? '' : "Passwords don't match"
                    }
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Button onClick={handlePasswordChange} variant="contained">
                  {' '}
                  Change Password
                </Button>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
      {/* <Grid item md={12} xs={12}>
        <Button variant="outlined" color="primary">
          Save Changes
        </Button>
      </Grid> */}
    </Grid>
  );
}

export default ProfileSettings;
