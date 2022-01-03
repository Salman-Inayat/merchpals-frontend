import { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Avatar,
  Typography,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  colors,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import Checkbox from '../components/Checkbox';
import SHIRT from '../assets/images/OGG1.png';

import { pink } from '@mui/material/colors';

const useStyles = makeStyles(() => ({
  product: {
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  box: {
    position: 'relative',
  },
  imageArea: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: '350px',
    height: '400px',
  },
  design: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',

    width: '120px',
    height: '120px',
  },
  absolute: {
    position: 'absolute',
    top: '20px',
    right: '20px',
  },
  colorGrid: {
    marginTop: '-12px',
  },
  productCard: {
    position: 'relative',
    borderRadius: '40px',
  },
  image: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  checkbox: {
    position: 'absolute',
    top: '20px',
    right: '20px',
  },
}));
const label = { inputProps: { 'aria-label': 'Select Project' } };

const ProductCard = ({
  product,
  onVariantClick = () => {},
  onProductClick = () => {},
  selectedVariants = {},
  initialDesign = '',
}) => {
  const classes = useStyles();
  const [design, setDesign] = useState('');

  useEffect(() => {
    setDesign(localStorage.getItem('initialDesign'));
    console.log(product.colors);
  }, []);

  const renderBgColor = () => {
    let bgColor = 'white';

    if (selectedVariants[product._id]) {
      const productSelectedVariants = selectedVariants[product._id];
      const lastSelectedColor =
        productSelectedVariants[productSelectedVariants?.length - 1];
      bgColor = product.colors.find(c => c.id === lastSelectedColor)?.label;
      console.log({ bgColor });
    }
    return bgColor;
  };

  return (
    // <Grid item>
    //   <Grid className={classes.product}>
    //     <Typography align='center'>{product.name}</Typography>
    //     <Box className={classes.box} style={{backgroundColor: renderBgColor()}}>
    //       <Box className={classes.imageArea}>
    //         <Avatar
    //           className={classes.avatar}
    //           variant="square"
    //           src={product.image}
    //         />
    //         <Avatar
    //           className={classes.design}
    //           variant="square"
    //           src={design}
    //         />
    //       </Box>

    //       <Box className={classes.absolute}>
    //         <Checkbox
    //           checked={selectedVariants[product._id] ? true : false }
    //           onChange={onProductClick}
    //           value={product._id}
    //         />
    //       </Box>
    //     </Box>
    //   </Grid>
    //   <Grid justifyContent='center' spacing={3} className={classes.colorGrid} container>
    //     {(product.colors.length !== 1 && product.colors.label !== 'n/a') && product.colors.map((pm,i) => (
    //       <Grid key={`colors-${i}`}  item>
    //         <Checkbox
    //           onChange={onVariantClick}
    //           checked={selectedVariants[product._id]?.includes(pm.id) ? true : false }
    //           value={`${product._id},${pm.id}`}
    //           color={pm.label}
    //         />
    //       </Grid>
    //     ))}
    //   </Grid>
    // </Grid>
    <>
      <Typography
        align="center"
        variant="h5"
        style={{
          color: '#0097a7',
          width: '70%',
          margin: 'auto',
          fontWeight: '500',
        }}
      >
        {product.name}
      </Typography>
      <Card
        className={classes.productCard}
        style={{ backgroundColor: renderBgColor() }}
      >
        <Box
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
          }}
        >
          <Checkbox
            checked={selectedVariants[product._id] ? true : false}
            onChange={onProductClick}
            value={product._id}
          />
        </Box>

        <CardMedia
          component="img"
          height="350"
          image={`${product.image}`}
          alt=""
        />
        <Box>
          <img className={classes.design} src={design}></img>
        </Box>
      </Card>

      <Grid
        justifyContent="center"
        spacing={3}
        className={classes.colorGrid}
        container
      >
        {product.colors.length !== 1 &&
          product.colors.label !== 'n/a' &&
          product.colors.map((pm, i) => (
            <Grid key={`colors-${i}`} item>
              {/* <Checkbox
                onChange={onVariantClick}
                checked={
                  selectedVariants[product._id]?.includes(pm.id) ? true : false
                }
                value={`${product._id},${pm.id}`}
                color={pm.label}
              /> */}
              <Checkbox
                onChange={onVariantClick}
                checked={
                  selectedVariants[product._id]?.includes(pm.id) ? true : false
                }
                value={`${product._id},${pm.id}`}
                // color={pm.label}
                sx={{
                  backgroundColor: colors.pink[600],
                  '&.Mui-checked': {
                    color: pink[600],
                  },
                }}
              />
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export { ProductCard as default };