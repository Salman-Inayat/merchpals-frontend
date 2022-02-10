// material
import { Box, Button, Checkbox, Grid, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveThemeColor } from '../../store/redux/actions/design';
// ----------------------------------------------------------------------
const useStyle = makeStyles(theme => ({
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

  colorsContainer: {
    width: '80%',
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
            color === 'TONIGHT'
              ? classes.TONIGHT_click
              : style.TONIGHT
              ? classes.TONIGHT_click
              : classes.TONIGHT
          }
          onClick={() => handleThemeChange('TONIGHT')}
        ></Paper>
      </Grid>
      <Grid item md={2}>
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
    </Grid>
  );
}
