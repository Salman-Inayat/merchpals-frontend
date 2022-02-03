// material
import { Box, Button, Checkbox, Grid, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveThemeColor } from '../../store/redux/actions/design';
// ----------------------------------------------------------------------
const useStyle = makeStyles({
  WHITE: {
    backgroundColor: '#ECE5E5',
    padding: '20px',
    cursor: 'pointer',
    '&:hover': {
      boxShadow: '3px 3px 3px #000',
    },
  },
  TONIGHT: {
    padding: '20px',
    backgroundColor: '#4F68DC',
    cursor: 'pointer',
    '&:hover': {
      boxShadow: '3px 3px 3px #000',
    },
  },
  BOURBON: {
    padding: '20px',
    backgroundColor: '#EC6F66',
    cursor: 'pointer',
    '&:hover': {
      boxShadow: '3px 3px 3px #000',
    },
  },
  BANG: {
    padding: '20px',
    backgroundColor: '#007991',
    cursor: 'pointer',
    '&:hover': {
      boxShadow: '3px 3px 3px #000',
    },
  },
  WHITE_click: {
    backgroundColor: '#ECE5E5',
    padding: '20px',
    boxShadow: '3px 3px 3px #000',
  },
  TONIGHT_click: {
    padding: '20px',
    backgroundColor: '#4F68DC',
    boxShadow: '3px 3px 3px #000',
  },
  BOURBON_click: {
    padding: '20px',
    backgroundColor: '#EC6F66',
    boxShadow: '3px 3px 3px #000',
  },
  BANG_click: {
    padding: '20px',
    backgroundColor: '#007991',
    boxShadow: '3px 3px 3px #000',
  },
});

export default function SelectTheme({ setThemeColor }) {
  const classes = useStyle();
  const dispatch = useDispatch();
  const [style, setStyle] = useState({
    WHITE: null,
    TONIGHT: null,
    BANG: null,
    BOURBON: null,
  });

  const handleThemeChange = themeColor => {
    setStyle({
      [themeColor]: themeColor,
    });
    setThemeColor(themeColor);
    dispatch(saveThemeColor({ themeColor }));
  };
  return (
    <Grid item md={12} spacing={2}>
      <Grid item md>
        <Typography variant="h6">Choose your theme</Typography>
      </Grid>
      <Grid item container md={12} spacing={2}>
        <Grid item md={2}>
          <Paper
            elevation={4}
            className={style.WHITE ? classes.WHITE_click : classes.WHITE}
            onClick={() => handleThemeChange('WHITE')}
          ></Paper>
        </Grid>
        <Grid item md={2}>
          <Paper
            elevation={4}
            className={style.TONIGHT ? classes.TONIGHT_click : classes.TONIGHT}
            onClick={() => handleThemeChange('TONIGHT')}
          ></Paper>
        </Grid>
        <Grid item md={2}>
          <Paper
            elevation={4}
            className={style.BOURBON ? classes.BOURBON_click : classes.BOURBON}
            onClick={() => handleThemeChange('BOURBON')}
          ></Paper>
        </Grid>
        <Grid item md={2}>
          <Paper
            elevation={4}
            className={style.BANG ? classes.BANG_click : classes.BANG}
            onClick={() => handleThemeChange('BANG')}
          ></Paper>
        </Grid>
      </Grid>
    </Grid>
  );
}
