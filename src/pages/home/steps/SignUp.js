import RegisterForm from '../../../components/authentication/register/RegisterForm';
import { Grid, Typography } from '@mui/material';

const SignUp = ({ registerVendor = () => {}, registrationErrors = {} }) => {
  return (
    <Grid container justifyContent="center" alignItems="center" mt={5}>
      <Grid
        item
        xs={10}
        container
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Typography variant="h4" style={{ marginBottom: '2rem' }}>
          Create Your Store
        </Typography>
        <RegisterForm
          registerVendor={registerVendor}
          registrationErrors={registrationErrors}
        />
      </Grid>
    </Grid>
  );
};

export { SignUp as default };
