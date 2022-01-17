import { Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <Grid direction="column" container>
      <Button>Store Products</Button>
      <Button onClick={() => navigate('/vendor/designs')}>Store Designs</Button>
      <Button onClick={() => navigate('/vendor/payment/onboarding')}>
        Payment Onboarding
      </Button>
    </Grid>
  );
};

export default Dashboard;
