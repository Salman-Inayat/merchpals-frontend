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
// import Checkbox from '../components/Checkbox';
import SHIRT from '../assets/images/OGG1.png';
import Checkbox from '@mui/material/Checkbox';
import { pink } from '@mui/material/colors';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import DoneIcon from '@mui/icons-material/Done';

const useStyles = makeStyles(theme => ({
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
    height: '100px',
    width: '100px',
    [theme.breakpoints.down('sm')]: {
      height: '70px',
      width: '70px',
    },
  },
  absolute: {
    position: 'absolute',
    top: '20px',
    right: '20px',
  },
  colorGrid: {
    marginTop: '-12px',
  },
  container: {
    [theme.breakpoints.down('sm')]: {
      height: '300px',
      width: '100%',
    },
  },
  productCard: {
    position: 'relative',
    borderRadius: '16px',
    [theme.breakpoints.down('sm')]: {
      margin: '5px',
    },
  },
  image: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  checkbox: {
    position: 'absolute',
    top: '15px',
    right: '15px',
  },
  productName: {
    color: '#0097a7',
    width: '70%',
    margin: 'auto',
    fontWeight: '500',
  },

  poster: {
    height: '150px',
    width: '150px',
    borderRadius: '5px',
    [theme.breakpoints.down('sm')]: {
      height: '105px',
      width: '105px',
    },
  },
  phoneCase: {
    height: '80px',
    width: '80px',
    [theme.breakpoints.down('sm')]: {
      height: '60px',
      width: '60px',
      top: '52%',
    },
  },
  mug: {
    height: '90px',
    width: '90px',
    top: '55%',
    left: '52%',
    [theme.breakpoints.down('sm')]: {
      height: '60px',
      width: '60px',
    },
  },
  productImage: {},
  checkboxContainer: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    [theme.breakpoints.down('sm')]: {
      top: '10px',
      right: '5px',
    },
  },
  colorsCheckbox: {
    [theme.breakpoints.down('sm')]: {
      width: '30px',
      height: '30px',
    },
  },
}));
const label = { inputProps: { 'aria-label': 'Select Project' } };

const ProductCard = ({
  product,
  onVariantClick = () => {},
  onProductClick = () => {},
  selectedVariants = {},
}) => {
  const classes = useStyles();
  const [design, setDesign] = useState('');

  useEffect(() => {
    setDesign(localStorage.getItem('design'));
    // console.log(product.colors);
  }, []);

  const renderBgColor = () => {
    let bgColor = 'white';

    if (selectedVariants[product._id]) {
      const productSelectedVariants = selectedVariants[product._id];
      const lastSelectedColor =
        productSelectedVariants[productSelectedVariants?.length - 1];
      bgColor = product.colors.find(c => c.id === lastSelectedColor)?.label;
      // console.log({ bgColor });
    }
    return bgColor;
  };

  return (
    <>
      <Typography align="center" variant="h5" className={classes.productName}>
        {product.name}
      </Typography>
      <Card
        className={classes.productCard}
        style={{ backgroundColor: renderBgColor() }}
      >
        <Box className={classes.checkboxContainer}>
          <Checkbox
            checked={selectedVariants[product._id] ? true : false}
            onChange={() => onProductClick(event.target.value)}
            value={product._id}
            icon={<RadioButtonUncheckedIcon />}
            checkedIcon={<CheckCircleIcon />}
          />
        </Box>

        <CardMedia
          component="img"
          image={`${product.image}`}
          alt=""
          className={classes.productImage}
        />
        <Box>
          <img
            className={[
              classes.design,
              product.name === 'Poster'
                ? classes.poster
                : product.name === 'Phone Case'
                ? classes.phoneCase
                : product.name === 'Mug'
                ? classes.mug
                : '',
            ].join(' ')}
            src={design}
          />
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
            <Grid key={`colors-${i}`} item md={2} xs={2}>
              <Checkbox
                style={{
                  backgroundColor:
                    `${pm.label}` === 'transparent' ? 'white' : `${pm.label}`,
                }}
                onChange={() => onVariantClick(event.target.value)}
                checked={
                  selectedVariants[product._id]?.includes(pm.id) ? true : false
                }
                value={`${product._id},${pm.id}`}
                sx={{
                  border: '1px solid #000',
                  color:
                    `${pm.label}` === 'transparent' ? 'white' : `${pm.label}`,
                  '&.Mui-checked': {
                    color: `${pm.label}` == 'white' ? 'black' : 'white',
                  },
                }}
                iconSize={40}
                checkedIcon={<DoneIcon />}
                className={classes.colorsCheckbox}
              />
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export { ProductCard as default };
