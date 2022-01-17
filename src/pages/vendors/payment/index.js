import { useNavigate } from 'react-router-dom';
import { Grid, Button, Typography } from '@mui/material';
import axios from 'axios';
import LoggedInVendor from '../../../layouts/LoggedInVendor';
import { baseURL } from '../../../configs/const';

const PaymentOnboarding = () => {
  const handleOnboarding = () => {
    const data = {};
    axios
      .post(`${baseURL}/stripe/account`, data, {
        headers: {
          Authorization: localStorage.getItem('MERCHPAL_AUTH_TOKEN'),
        },
      })
      .then(response => {
        window.location = response.data.url;
      })
      .catch(error => {
        console.log({ error });
      });
  };
  return (
    <LoggedInVendor>
      <Grid justifyContent="center" container>
        <Grid
          justifyContent="center"
          alignItems="center"
          direction="column"
          container
        >
          <Grid item>
            <Typography>Merchpals</Typography>
          </Grid>
          <Grid item>
            <Typography>
              Merchpals partners with stripe to transfer your earnings into your
              bank account
            </Typography>
          </Grid>
          <Grid item>
            <Button onClick={handleOnboarding} variant="contained">
              Setup payouts
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </LoggedInVendor>
  );
};

export default PaymentOnboarding;
