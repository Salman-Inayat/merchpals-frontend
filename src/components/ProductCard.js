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

const ProductCard = ({ 
  product, 
  onVariantClick = () => {},
  onProductClick = () => {},
  selectedVariants = {}
}) => {
  const classes = useStyles();
  const onChange = () => {}
  return (
    <Grid item>
      <Grid className={classes.product}>
        <Typography align='center'>{product.name}</Typography>
        <Box className={classes.box}>
          <Avatar 
            className={classes.avatar}
            variant="square"
            src={product.image}
          />

          <Box className={classes.absolute}>
            <Checkbox 
              checked={selectedVariants[product._id] ? true : false } 
              onChange={onProductClick}
              value={product._id}
            />
          </Box>
        </Box>
      </Grid>   

      <Grid justifyContent='center' spacing={3} className={classes.colorGrid} container>
        {(product.colors.length !== 1 && product.colors.label !== 'n/a') && product.colors.map((pm,i) => (
          <Grid key={`colors-${i}`}  item>
            <Checkbox 
              onChange={onVariantClick} 
              checked={selectedVariants[product._id]?.includes(pm.id) ? true : false } 
              value={`${product._id},${pm.id}`}
              color={pm.label}
            />
          </Grid>
        ))}
      </Grid>      
    </Grid> 
  )
}

export { ProductCard as default }