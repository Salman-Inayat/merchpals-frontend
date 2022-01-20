import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyle = makeStyles(theme => ({
  button: {
    margin: '1rem',
    [theme.breakpoints.down('sm')]: {
      margin: '0.5rem',
    },
  },
}));

function BackButton() {
  const navigate = useNavigate();
  const classes = useStyle();

  return (
    <Grid className={classes.button}>
      <Button onClick={() => navigate(-1)} variant="contained">
        Back
      </Button>
    </Grid>
  );
}

export default BackButton;
