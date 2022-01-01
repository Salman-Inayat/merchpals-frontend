import { useEffect, useState } from 'react';
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
  imageArea: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    width: '350px',
    height: '400px'
  },
  design: {
    position: "absolute",
    width: "150px",
    height: "150px"
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
  selectedVariants = {},
  initialDesign = ''
}) => {
  const classes = useStyles();
  const [design, setDesign] = useState('')
  useEffect(() => {
    setDesign(localStorage.getItem('initialDesign'))
  }, [])
  const renderBgColor = () => {
    let bgColor = 'white';

    if (selectedVariants[product._id]) {
      const productSelectedVariants = selectedVariants[product._id];
      const lastSelectedColor = productSelectedVariants[productSelectedVariants?.length -1]
      bgColor = product.colors.find(c => c.id === lastSelectedColor)?.label
      console.log({bgColor});
    }
    
    return bgColor
  }

  return (
    <Grid item>
      <Grid className={classes.product}>
        <Typography align='center'>{product.name}</Typography>
        <Box className={classes.box} style={{backgroundColor: renderBgColor()}}>
          <Box className={classes.imageArea}>
            <Avatar 
              className={classes.avatar}
              variant="square"
              src={product.image}
            />
            <Avatar 
              className={classes.design}
              variant="square"
              src={design}
            />            
          </Box>

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