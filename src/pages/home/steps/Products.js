import { useState } from 'react';
import { 
  Button,
  Grid, 
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import ProductCard from '../../../components/ProductCard';

const useStyles = makeStyles(() => ({
  footer: {
    backgroundColor: '#babdb3',
    maxWidth: '100%',
    position: 'fixed',
    bottom: '0',
    padding: '10px 0px'
  },
  btn: {
    color: '#fff',
    fontSize: '18px',
    '&:hover':{
      backgroundColor: '#aaa'
    }
  }
}))
const Products = ({
  nextStep = () => {},
  products = []
}) => {
  const [selectedVariants, setSelectedVariants] = useState({});

  const classes = useStyles();
  const onVariantClick = (productVariant) => {
    const [product, color] = productVariant.split(',')
    console.log({ product, color });
    let productColors = [];
    if (!selectedVariants[product]) {
       productColors = [color]
    } else {
      const colorIndex = selectedVariants[product].findIndex(c => c === color)
      console.log({ colorIndex });
      if (colorIndex > -1) {
        productColors = [...selectedVariants[product]]
        productColors.splice(colorIndex, 1)
      } else {
        productColors = [...selectedVariants[product], color]
      }
    }
    setSelectedVariants({
      ...selectedVariants,
      [product]: productColors
    })
  };

  return (
    <Grid container>
      <Grid container  justifyContent='center' alignItems='center' mt={5} pb={18}>
        <Grid item xs={8}  container  justifyContent='flex-start' alignItems='center' spacing={3}>
          { products.map((product, i) => (
            <Grid mt={5} key={`product-${i}`} item>
              <ProductCard product={product} onVariantClick={onVariantClick} selectedVariants={selectedVariants}/>
            </Grid>                               
          ))}
        </Grid>
      </Grid>
      <Grid container justifyContent='center' alignItems='center' className={classes.footer}>
        <Button onClick={nextStep} className={classes.btn}>Continue</Button>
      </Grid>
    </Grid>
  )
}

export { Products as default }