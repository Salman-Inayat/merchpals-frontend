import { Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    link: {
        textDecoration: 'none',
        color: 'black',
        fontWeight: '400'
    }
}))

const SubFooter = () => {
    
    const classes = useStyles();

    return (
        <Grid style={{backgroundColor: 'white', padding: '.5rem'}}>
            <Grid display='flex' justifyContent='space-around' alignItems='center' style={{maxWidth: '500px', margin: 'auto', marginBottom: '1rem'}}>
                <Link className={classes.link} to='/terms-of-services'>Terms of service</Link>
                <Link className={classes.link} to='/privacy-policy'>Privacy policy</Link>
                <Link className={classes.link} to='/contact'>Contact support</Link>
            </Grid>
            <Typography textAlign='center'>©2022 Merchpals All Rights Reserved</Typography>
        </Grid>
    )
}
export default SubFooter;