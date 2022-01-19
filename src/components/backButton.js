import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Grid } from '@mui/material';

function BackButton() {
  const navigate = useNavigate();

  return (
    <Grid justifyContent="flex-start" container>
      <Button onClick={() => navigate(-1)} variant="contained">
        Back
      </Button>
    </Grid>
  );
}

export default BackButton;
