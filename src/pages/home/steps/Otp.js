import {
  Grid
} from '@mui/material';
import OtpVerification from '../../authentication/OtpVerification';

const Otp = ({
  nextStep = () => {}
}) => {
  return (
    <Grid container>
      <Grid container  justifyContent='center' alignItems='center' mt={5}>
        <Grid item xs={6}  container  justifyContent='center' alignItems='center' spacing={3}>
          <OtpVerification fireNextStep nextStep={nextStep} />
        </Grid>
      </Grid>
    </Grid>
  )
}

export { Otp as default }