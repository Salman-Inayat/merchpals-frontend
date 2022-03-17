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
import axios from 'axios';
import { baseURL } from '../../../configs/const';
import LoggedInVendor from '../../../layouts/LoggedInVendor';
import BackButton from '../../../components/backButton';
import { usePasswordValidation } from '../../../hooks/validatePassword';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ProfileSettings() {
  // const vendor = vendorData;
  const [toggleChangePassword, setToggleChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatched, setPasswordsMatched] = useState(true);
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [snackBarToggle, setSnackBarToggle] = useState({
    visible: false,
    type: 'success',
    message: 'Message sent successfully',
  });
  const [vendorData, setVendorData] = useState({});

  const [validLength, hasNumber, upperCase, lowerCase, match, specialChar] = usePasswordValidation({
    firstPassword: newPassword,
    secondPassword: confirmPassword,
  });

  useEffect(() => {
    fetchVendorData();
  }, []);

  const fetchVendorData = () => {
    axios
      .get(`${baseURL}/vendor/profile`, {
        headers: {
          Authorization: localStorage.getItem('MERCHPAL_AUTH_TOKEN'),
        },
      })
      .then(res => {
        const vendor = res.data.vendor;
        setVendorData(vendor);
        setFirstname(vendor.firstName);
        setLastname(vendor.lastName);
      })
      .catch(err => {
        console.log(err);
      });
  };

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
        if (res.data.isPasswordmatched == true) {
          setToggleChangePassword(true);
        } else {
          setPasswordError('Password entered is incorrect');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handlePasswordChange = () => {
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
          setSnackBarToggle({
            visible: true,
            type: 'success',
            message: 'Password changed successfully',
          });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      setPasswordsMatched(false);
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
        setSnackBarToggle({
          visible: true,
          type: 'success',
          message: 'Name updated successfully',
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
      <Grid container spacing={2}>
        <Grid item md={2} xs={12}></Grid>
        <Grid item md={8} xs={12}>
          <Grid container>
            <Grid item md={12} xs={12} mb={4}>
              <Typography variant="h4" align="center">
                Profile Settings
              </Typography>
            </Grid>
            <Grid item md={12} xs={12} mb={3}>
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
            <Grid item md={12} xs={12} mb={2}>
              <Grid container spacing={2}>
                <Grid item md={6}>
                  <TextField
                    label="Email"
                    value={vendorData.email}
                    fullWidth
                    disabled
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    label="Phone No"
                    value={vendorData.phoneNo}
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
                          value={newPassword}
                          label="New Password"
                          fullWidth
                          type="password"
                          onChange={e => {
                            setNewPassword(e.target.value);
                          }}
                          helperText={!validLength ? 'Password should be minimum 6 characters' : ''}
                        />
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item md={12} mb={2}>
                        <TextField
                          value={confirmPassword}
                          label="Confirm Password"
                          fullWidth
                          type="password"
                          onChange={e => {
                            setConfirmPassword(e.target.value);
                          }}
                          helperText={!match ? "Passwords don't match" : ''}
                        />
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Button
                        onClick={handlePasswordChange}
                        variant="contained"
                        disabled={!match || !validLength}
                      >
                        {' '}
                        Change Password
                      </Button>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={2} xs={12}></Grid>

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

export default ProfileSettings;
