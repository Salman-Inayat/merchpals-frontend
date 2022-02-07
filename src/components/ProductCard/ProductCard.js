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
  Radio,
  RadioGroup,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
// import Checkbox from '../components/Checkbox';
import SHIRT from '../../assets/images/OGG1.png';
import Checkbox from '@mui/material/Checkbox';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

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
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '100px',
    width: '100px',
    [theme.breakpoints.down('sm')]: {
      height: '60px',
      width: '60px',
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
    borderRadius: '0px',
    boxShadow:
      '0px 0px 0px 0px rgba(0,0,0,0.2), 0px 0px 0px 0px rgba(0,0,0,0.14), 0px 0px 0px 0px rgba(0,0,0,0.12)',
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
    color: '#116dff',
    width: '70%',
    margin: 'auto',
    fontWeight: '500',
  },

  poster: {
    height: '150px',
    width: '150px',
    borderRadius: '5px',
    top: '50%',

    [theme.breakpoints.down('sm')]: {
      height: '105px',
      width: '105px',
    },
  },
  phoneCase: {
    height: '80px',
    width: '80px',
    top: '50%',
    [theme.breakpoints.down('sm')]: {
      height: '50px',
      width: '50px',
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
    width: '30px',
    height: '30px',
    [theme.breakpoints.down('sm')]: {
      width: '30px',
      height: '30px',
    },
  },
  radioGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioBox: {
    borderRadius: '50%',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2px',
  },
  radioButton: {
    height: '30px',
    width: '30px',
    [theme.breakpoints.down('sm')]: {
      width: '20px',
      height: '20px',
    },
  },
}));
const label = { inputProps: { 'aria-label': 'Select Project' } };

const ProductCard = ({
  product,
  onVariantClick = () => {},
  onProductClick = () => {},
  selectedVariants = {},
  designName,
  unselectProducts,
}) => {
  const classes = useStyles();
  const [design, setDesign] = useState('');
  const [radioCardColor, setRadioCardColor] = useState('');

  useEffect(() => {
    setDesign(localStorage.getItem('design'));
    // console.log(product.colors);
  }, []);

  const renderBgColor = () => {
    let bgColor = 'white';

    if (selectedVariants[product._id]) {
      const productSelectedVariants = selectedVariants[product._id];
      const lastSelectedColor = productSelectedVariants[productSelectedVariants?.length - 1];
      bgColor = product.colors.find(c => c.id === lastSelectedColor)?.label;
      // console.log({ bgColor });
    }
    return bgColor;
  };

  const handleRadioCardChange = event => {
    setRadioCardColor(event.target.value);
  };

  return (
    <>
      <Typography align="center" variant="h5" className={classes.productName}>
        {designName ? designName : ''} {product.name}
      </Typography>
      <Card
        className={classes.productCard}
        style={{
          backgroundColor: !unselectProducts ? radioCardColor : renderBgColor(),
        }}
      >
        <Box className={classes.checkboxContainer}>
          <Checkbox
            disabled={!unselectProducts}
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
          style={{
            border: selectedVariants[product._id] ? '3px solid #116dff' : '3px solid #ccc',
          }}
        />
        <Box>
          <img
            className={[
              classes.design,
              product.name === 'Poster'
                ? classes.poster
                : product.name === 'Case'
                ? classes.phoneCase
                : product.name === 'white glossy mug'
                ? classes.mug
                : '',
            ].join(' ')}
            src={design}
          />
        </Box>
      </Card>

      <Grid justifyContent="center" spacing={3} className={classes.colorGrid} container>
        {!unselectProducts ? (
          <Grid item md={12} xs={12}>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={radioCardColor}
              onChange={handleRadioCardChange}
              row
              classname={classes.radioGroup}
            >
              <Grid justifyContent="center" spacing={1} container>
                {product.colors.length !== 1 &&
                  product.colors.label !== 'n/a' &&
                  product.colors.map((pm, i) => (
                    <Grid key={`colors-${i}`} item md={2} xs={2}>
                      <Box
                        sx={{
                          border: selectedVariants[product._id]?.includes(pm.id)
                            ? '1px solid red'
                            : '',
                        }}
                        className={classes.radioBox}
                      >
                        <Radio
                          style={{
                            backgroundColor: `${pm.label}`,
                          }}
                          value={pm.label}
                          sx={{
                            color: `${pm.label}`,
                            '&.Mui-checked': {
                              color: `${pm.label}`,
                              boxShadow: '0px 5px 5px 2px rgba(0,0,0,0.4)',
                            },
                          }}
                          className={classes.radioButton}
                        />
                      </Box>
                    </Grid>
                  ))}
              </Grid>
            </RadioGroup>
          </Grid>
        ) : (
          product.colors.length !== 1 &&
          product.colors.label !== 'n/a' &&
          product.colors.map((pm, i) => (
            <Grid key={`colors-${i}`} item md={2} xs={2}>
              <Checkbox
                style={{
                  backgroundColor: `${pm.label}` === 'transparent' ? 'white' : `${pm.label}`,
                }}
                onChange={() => onVariantClick(event.target.value)}
                onClick={() => console.log('clicked the checkbox')}
                checked={selectedVariants[product._id]?.includes(pm.id) ? true : false}
                value={`${product._id},${pm.id}`}
                sx={{
                  color: `${pm.label}` === 'transparent' ? 'white' : `${pm.label}`,
                  border: '2px solid blue',

                  '&.Mui-checked': {
                    color: `${pm.label}`,
                    boxShadow: '0px 5px 5px 2px rgba(0,0,0,0.4)',
                  },
                }}
                className={classes.colorsCheckbox}
              />
            </Grid>
          ))
        )}
      </Grid>
    </>
  );
};

export { ProductCard as default };
