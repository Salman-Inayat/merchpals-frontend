import { makeStyles } from '@mui/styles';
import { Container, Grid, Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const themeStyles = makeStyles({
  white: {
    background: `linear-gradient(45deg, #fff , #fff )`,
    color: '#000 !important',
  },
  tonight: {
    background: `linear-gradient(45deg, #4f68dc 30%, #ba0066 90%)`,
    color: '#fff !important',
  },
  bourbon: {
    background: `linear-gradient(45deg, #ec6f66 30%, #f3a183 90%)`,
    color: '#000 !important',
  },
  bang: {
    background: `linear-gradient(45deg, #007991 30%, #78ffd6 90%)`,
    color: '#fff !important',
  },
  white_clr: {
    color: '#000 !important',
  },
  tonight_clr: {
    color: '#fff !important',
  },
  bourbon_clr: {
    color: '#000 !important',
  },
  bang_clr: {
    color: '#fff !important',
  },
});
ThemeCustomise.propTypes = {
  children: PropTypes.node,
};
function ThemeCustomise(colors) {
  const classes = themeStyles();
  switch (colors) {
    case 'WHITE':
      return classes.white;
    case 'TONIGHT':
      return classes.tonight;
    case 'BOURBON':
      return classes.bourbon;
    case 'BANG':
      return classes.bang;
    default:
      return classes.white;
  }
}
function ThemeColorCustomise(colors) {
  const classes = themeStyles();
  switch (colors) {
    case 'WHITE':
      return classes.white_clr;
    case 'TONIGHT':
      return classes.tonight_clr;
    case 'BOURBON':
      return classes.bourbon_clr;
    case 'BANG':
      return classes.bang_clr;
    default:
      return classes.white_clr;
  }
}
export { ThemeCustomise, ThemeColorCustomise };
