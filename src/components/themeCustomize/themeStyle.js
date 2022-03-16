import { makeStyles } from '@mui/styles';
import { Container, Grid, Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const themeStyles = makeStyles({
  white: {
    backgroundColor: 'white',
    color: '#000 !important',
  },
  tonight: {
    backgroundColor: '#252525',
    color: '#fff !important',
  },
  bang: {
    backgroundColor: '#BEC3C8',
    color: '#fff !important',
  },
  white_clr: {
    color: '#000 !important',
  },
  tonight_clr: {
    color: '#fff !important',
  },
  bang_clr: {
    color: '#fff !important',
  },
});

const ThemeCustomise = (classes, colors) => {
  switch (colors) {
    case 'WHITE':
      return classes.white;
    case 'TONIGHT':
      return classes.tonight;
    case 'BANG':
      return classes.bang;
    default:
      return classes.white;
  }
};
const ThemeColorCustomise = (classes, colors) => {
  switch (colors) {
    case 'WHITE':
      return classes.white_clr;
    case 'TONIGHT':
      return classes.tonight_clr;
    case 'BANG':
      return classes.bang_clr;
    default:
      return classes.white_clr;
  }
};
export { ThemeCustomise, ThemeColorCustomise, themeStyles };
