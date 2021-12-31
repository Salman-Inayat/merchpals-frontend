import { 
  Box,
  Grid, 
  Avatar,
  Typography
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import Checkbox from '../components/Checkbox'
import SHIRT from '../assets/images/OGG1.png';

const useStyles = makeStyles(() => ({
  product: {
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  box: {
    position: 'relative'
  },
  avatar: {
    width: '350px',
    height: '400px'
  },
  absolute: {
    position: 'absolute',
    top: '20px',
    right: '20px'
  },
  colorGrid: {
    marginTop: '-12px'
  }
}))
const label = { inputProps: { 'aria-label': 'Select Project' } };

const ProductCard = () => {
  const classes = useStyles();
  const onChange = () => {}
  return (
    <Grid item>
      <Grid className={classes.product}>
        <Typography align='center'>Shirt</Typography>
        <Box className={classes.box}>
          <Avatar 
            className={classes.avatar}
            variant="square"
            src={SHIRT}
          />

          <Box className={classes.absolute}>
            <Checkbox onChange={onChange} checked={true} />
          </Box>
        </Box>
      </Grid>   

      <Grid justifyContent='center' spacing={3} className={classes.colorGrid} container>
        <Grid item>
          <Checkbox onChange={onChange} checked={false} />
        </Grid>
        <Grid item>
          <Checkbox onChange={onChange} checked={false} />
        </Grid>
        <Grid item>
          <Checkbox onChange={onChange} checked={false} />
        </Grid>
      </Grid>      
    </Grid> 
  )
}

export { ProductCard as default }