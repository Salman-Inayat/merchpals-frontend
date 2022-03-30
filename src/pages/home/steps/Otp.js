import { Grid } from '@mui/material';
import OtpVerification from '../../authentication/OtpVerification';

const Otp = ({ nextStep = () => {}, phoneNo }) => {
  return (
    <Grid container>
      <Grid container justifyContent="center" alignItems="center" mt={5}>
        <Grid item xs={12} md={4} container justifyContent="center" alignItems="center" spacing={3}>
          <OtpVerification fireNextStep nextStep={nextStep} phoneNo={phoneNo} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export { Otp as default };
