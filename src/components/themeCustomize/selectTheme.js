// material
import { Box, Button, Checkbox, Grid, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveThemeColor } from '../../store/redux/actions/design';
// ----------------------------------------------------------------------
const useStyle = makeStyles(theme => ({
  WHITE: {
    backgroundColor: 'white',
    padding: '30px 20px',
    cursor: 'pointer',
    '&:hover': {
      boxShadow: '0px 0px 6px 8px rgba(17, 109, 255, .15)',
    },
  },
  TONIGHT: {
    padding: '30px 20px',
    backgroundColor: '#1E1E1E',
    cursor: 'pointer',
    '&:hover': {
      boxShadow: '0px 0px 6px 8px rgba(17, 109, 255, .15)',
    },
  },
  BANG: {
    padding: '30px 20px',
    backgroundColor: '#BEC3C8',
    cursor: 'pointer',
    '&:hover': {
      boxShadow: '0px 0px 6px 8px rgba(17, 109, 255, .15)',
    },
  },
  WHITE_click: {
    backgroundColor: 'white',
    padding: '30px 20px',
    boxShadow: '0px 0px 6px 8px rgba(17, 109, 255, .65)',
  },
  TONIGHT_click: {
    padding: '30px 20px',
    backgroundColor: '#1E1E1E',
    boxShadow: '0px 0px 6px 8px rgba(17, 109, 255, .65)',
  },
  BANG_click: {
    padding: '30px 20px',
    backgroundColor: '#BEC3C8',
    boxShadow: '0px 0px 6px 8px rgba(17, 109, 255, .65)',
  },

  colorsContainer: {
    width: '150%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      margin: '10px 0px 30px 0px !important',
    },
  },
}));

export default function SelectTheme({ setThemeColor, color, setColor }) {
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
    if (color) {
      setColor(null);
    }
    setThemeColor(themeColor);
    dispatch(saveThemeColor({ themeColor }));
  };
  return (
    <Grid
      container
      spacing={2}
      display="flex"
      justifyContent="center"
      className={classes.colorsContainer}
    >
      <Grid item md={2}>
        <Paper
          elevation={4}
          className={
            color === 'WHITE'
              ? classes.WHITE_click
              : style.WHITE
              ? classes.WHITE_click
              : classes.WHITE
          }
          onClick={() => handleThemeChange('WHITE')}
        ></Paper>
      </Grid>
      <Grid item md={2}>
      <Paper
          elevation={4}
          className={
            color === 'BANG' ? classes.BANG_click : style.BANG ? classes.BANG_click : classes.BANG
          }
          onClick={() => handleThemeChange('BANG')}
        ></Paper>
      </Grid>
      <Grid item md={2}>
      <Paper
          elevation={4}
          className={
            color === 'TONIGHT'
              ? classes.TONIGHT_click
              : style.TONIGHT
              ? classes.TONIGHT_click
              : classes.TONIGHT
          }
          onClick={() => handleThemeChange('TONIGHT')}
        ></Paper>
      </Grid>
      {/* <Grid item md={2}>
      <Paper
          elevation={4}
          className={
            color === 'BOURBON'
              ? classes.BOURBON_click
              : style.BOURBON
              ? classes.BOURBON_click
              : classes.BOURBON
          }
          onClick={() => handleThemeChange('BOURBON')}
        ></Paper>
      </Grid> */}
    </Grid>
  );
}