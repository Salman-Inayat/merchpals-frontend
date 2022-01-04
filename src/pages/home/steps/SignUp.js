import RegisterForm from '../../../components/authentication/register/RegisterForm';
import { Grid, Typography } from '@mui/material';

const SignUp = ({ registerVendor = () => {}, registrationErrors = {} }) => {
  return (
    <Grid container>
      <Grid container justifyContent="center" alignItems="center" mt={5}>
        <Grid
          item
          xs={6}
          container
          justifyContent="center"
          alignItems="center"
          spacing={3}
        >
          <RegisterForm
            registerVendor={registerVendor}
            registrationErrors={registrationErrors}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export { SignUp as default };
