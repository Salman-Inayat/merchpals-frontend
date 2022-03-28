import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { AppBar, Typography } from '@mui/material';
// components
// import Logo from '../components/Logo';
import { logo } from '../assets/img';
//
import { MHidden } from '../components/@material-extend';
import { makeStyles } from '@mui/styles';

// ----------------------------------------------------------------------

const HeaderStyle = styled('header')(({ theme }) => ({
  
}));
const useStyles = makeStyles(theme => ({
  nav: {
    position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 500,
  lineHeight: 0,
  maxHeight: '70px',
  backgroundColor: 'white',
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    // padding: theme.spacing(7, 5, 0, 7)
  }
  }
}))

// ----------------------------------------------------------------------

AuthLayout.propTypes = {
  children: PropTypes.node
};

export default function AuthLayout({ children }) {
  const classes = useStyles()
  return (
    <AppBar className={classes.nav}>
      <RouterLink to="/">
        <img src={logo} alt='' style={{maxHeight: '70px', marginLeft: '2rem'}}/>
      </RouterLink>

      <MHidden width="smDown">
        <Typography
          variant="body2"
          sx={{
            my: 'auto',
            ml: 'auto',
            mr: 6
          }}
        >
          {children}
        </Typography>
      </MHidden>
    </AppBar>
  );
}