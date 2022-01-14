import { Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LoggedInVendor from '../../../../layouts/LoggedInVendor';

const EditDesign = () => {
  const navigate = useNavigate();
  return (
    <LoggedInVendor>
      <Grid mt={5} container>
        <Grid justifyContent="flex-start" container>
          <Button onClick={() => navigate('/vendor/designs')}>
            Back to designs
          </Button>
        </Grid>
      </Grid>
    </LoggedInVendor>
  );
};

export default EditDesign;
