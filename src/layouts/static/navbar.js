import { AppBar, Link } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { logo } from '../../assets/img';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    nav: {
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: '2rem',
        fontWeight: '500',
        paddingLeft: '.6rem',
        [theme.breakpoints.up('sm')]: {  
            paddingRight: '8rem',
            paddingLeft: '4rem'
        }
    },
    logo: {
        maxHeight: '70px'
    },
}))

const Navbar = () => {

    const classes = useStyles();

    return (
        <AppBar position="static">
          <div className={classes.nav}>
              <img className={classes.logo} src={logo} alt='' />
              <RouterLink
              style={{textDecoration:'none', color: '#212B36', fontSize: '20px'}}
          to="/login"
        >
          Log in
        </RouterLink>
          </div>
        </AppBar>
    )
}
export default Navbar;