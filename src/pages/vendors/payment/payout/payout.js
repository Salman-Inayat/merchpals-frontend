import { Grid, Button, Typography } from '@mui/material';

const Payout = ({ handleOnboarding }) => {
  return (
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
  );
};

export default Payout;
