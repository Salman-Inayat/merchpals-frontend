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
import store from '../../store';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useMediaQuery } from 'react-responsive';

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
    height: '35%',
    width: '35%',
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
  // selectedCard: {
  //   position: 'relative',
  //   borderRadius: '0px',
  //   backgroundColor: '#116dff!important',
  //   padding: '.4rem!important',
  //   boxShadow:
  //     '0px 0px 0px 0px rgba(0,0,0,0.2), 0px 0px 0px 0px rgba(0,0,0,0.14), 0px 0px 0px 0px rgba(0,0,0,0.12)',
  //   [theme.breakpoints.down('sm')]: {
  //     margin: '5px',
  //   },
  // },
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
    width: '70%',
    margin: 'auto',
    fontWeight: '500',
  },

  poster: {
    height: '57%',
    width: '57%',
    borderRadius: '5px',
    top: '50%',

    // [theme.breakpoints.down('sm')]: {
    //   height: '105px',
    //   width: '105px',
    // },
  },
  phoneCase: {
    top: '50%',
    width: '31%',
    height: '29%',
    // [theme.breakpoints.down('sm')]: {
    //   height: '50px',
    //   width: '50px',
    //   top: '52%',
    // },
  },
  mug: {
    height: '30%',
    width: '30%',
    top: '55%',
    left: '52%',
    // [theme.breakpoints.down('sm')]: {
    //   height: '60px',
    //   width: '60px',
    // },
  },
  productImage: {},
  checkboxContainer: {
    position: 'absolute',
    top: '0px',
    right: '5px',
    [theme.breakpoints.down('sm')]: {
      top: '0px',
      right: '5px',
    },
  },
  colorsCheckbox: {
    height: '20px',
    width: '20px',
    [theme.breakpoints.down('lg')]: {
      width: '30px',
      height: '30px',
    },
    [theme.breakpoints.down('sm')]: {
      width: '20px',
      height: '20px',
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
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2px',
    [theme.breakpoints.down('sm')]: {
      padding: '3px 13px',
    },
  },

  largeRadioBox: {
    borderRadius: '50%',
    width: '100%',
    height: '100%',
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2px',
    [theme.breakpoints.down('sm')]: {
      padding: '3px 13px',
    },
  },

  radioButton: {
    height: '20px',
    width: '20px',
    [theme.breakpoints.down('lg')]: {
      width: '30px',
      height: '30px',
    },
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
  const [iphoneDesign, setIphoneDesign] = useState('');
  const [mugPosterDesign, setMugPosterDesign] = useState('');
  const [productDesign, setProductDesign] = useState();
  const [radioCardColor, setRadioCardColor] = useState('');
  const [check, setCheck] = useState('');

  const islargeDesktop = useMediaQuery({ minWidth: 1400 });

  useEffect(() => {
    // console.log(design);
    setTimeout(() => {
      const design = store.getState().design?.design?.front?.designImages[4]?.data;
      const iphoneDesign =
        store.getState().design?.design?.front?.designImages[3]?.data ||
        store.getState().design?.design?.back?.designImages[3]?.data;
      const mugPoster =
        store.getState().design?.design?.front?.designImages[4]?.data ||
        store.getState().design?.design?.back?.designImages[4]?.data;
      setDesign(design);
      setIphoneDesign(iphoneDesign);
      setMugPosterDesign(mugPoster);
      setProductDesign(product.image);
    }, 1000);
  }, []);

  const renderBgColor = () => {
    let bgColor = '#fff';

    if (selectedVariants[product._id]) {
      const productSelectedVariants = selectedVariants[product._id];
      const lastSelectedColor = productSelectedVariants[productSelectedVariants?.length - 1];
      bgColor = product.colors.find(c => c.id === lastSelectedColor)?.label;
      bgColor =
        bgColor === 'white'
          ? '#fff'
          : bgColor === 'navy'
          ? '#262d4f '
          : bgColor === 'black'
          ? '#121616'
          : '';
    }
    return bgColor;
  };

  const handleRadioCardChange = event => {
    const bgColor =
      event.target.value === 'white'
        ? '#ffffff'
        : event.target.value === 'navy'
        ? '#262d4f '
        : event.target.value === 'black'
        ? '#121616'
        : '';
    setRadioCardColor(bgColor);
  };
  // console.log('single product', productDesign);
  return (
    <>
      <Typography
        align="center"
        variant="h5"
        className={classes.productName}
        style={{
          color: selectedVariants[product._id] ? '#116dff' : ' #ccc',
        }}
      >
        {designName ? designName : ''} {product.slug === 'longsleeve' ? 'Long' : product.name}
      </Typography>
      <Grid
        style={{
          backgroundColor: selectedVariants[product._id] ? '#116dff' : ' #ccc',
          padding: selectedVariants[product._id] ? '.4rem' : ' 0',
        }}
      >
        <Card
          className={classes.productCard}
          style={{
            backgroundColor: !unselectProducts ? radioCardColor : renderBgColor(),
          }}
          onMouseOver={() => {
            if (
              store.getState().design?.design?.back?.designImages[4]?.data
              // &&
              // store.getState().design?.design?.front?.designImages[4]?.data
            ) {
              product.name !== 'Case' &&
                product.name !== 'Poster' &&
                product.name !== 'Mug' &&
                (setDesign(
                  store.getState().design?.design?.back?.designImages[4]?.data,
                  // ||
                  //   store.getState().design?.design?.front?.designImages[4]?.data,
                ),
                product.slug === 'hoodie'
                  ? setProductDesign(product.backImage)
                  : product.slug === 'longsleeve'
                  ? setProductDesign(product.backImage)
                  : setProductDesign(product.backImage));
            }
          }}
          onMouseLeave={() => {
            if (
              store.getState().design?.design?.back?.designImages[4]?.data
              // &&
              // store.getState().design?.design?.front?.designImages[4]?.data
            ) {
              product.name !== 'Case' &&
                product.name !== 'Poster' &&
                product.name !== 'Mug' &&
                (setDesign(store.getState().design?.design?.front?.designImages[4]?.data),
                setProductDesign(product.image));
            }
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
              style={{
                color: selectedVariants[product._id] ? '#116dff' : ' #ccc',
              }}
            />
          </Box>

          <CardMedia
            component="img"
            image={productDesign}
            alt=""
            className={classes.productImage}
            style={{
              border: selectedVariants[product._id] ? '3px solid #116dff' : '3px solid #ccc',
              backgroundImage: product.name === 'Case' && `url(${iphoneDesign})`,
              // backgroundColor: 'red',
              backgroundSize: product.name === 'Case' && '37% 80%',
            }}
          />
          {product.name !== 'Case' && (
            <Box>
              {design && product.name !== 'Poster' && product.name !== 'Mug' ? (
                <img
                  className={[
                    classes.design,
                    product.name === 'Poster'
                      ? classes.poster
                      : product.name === 'Case'
                      ? classes.phoneCase
                      : product.name === 'Mug'
                      ? classes.mug
                      : '',
                  ].join(' ')}
                  src={design}
                />
              ) : (
                mugPosterDesign &&
                (product.name === 'Mug' || product.name === 'Poster') && (
                  <img
                    className={[
                      classes.design,
                      product.name === 'Poster'
                        ? classes.poster
                        : product.name === 'Case'
                        ? classes.phoneCase
                        : product.name === 'Mug'
                        ? classes.mug
                        : '',
                    ].join(' ')}
                    src={mugPosterDesign}
                  />
                )
              )}
            </Box>
          )}
        </Card>
      </Grid>

      <Grid justifyContent="center" spacing={3} className={classes.colorGrid} container>
        {!unselectProducts ? (
          <Grid item md={12} xs={12}>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={radioCardColor}
              onChange={handleRadioCardChange}
              row
              className={classes.radioGroup}
            >
              <Grid justifyContent="center" spacing={1} container>
                {product.colors.length !== 1 &&
                  product.colors.label !== 'n/a' &&
                  product.colors.map((pm, i) => (
                    <Grid key={`colors-${i}`} item md={2} xs={2}>
                      <Box
                        sx={{
                          border: selectedVariants[product._id]?.includes(pm.id)
                            ? '2px solid #116DFF'
                            : pm.label === 'white'
                            ? '1px solid #00000066'
                            : '',
                          // border: selectedVariants[product._id]?.includes(pm.id)
                          //   ? pm.label === '#ffffff'
                          //     ? ''
                          //     : '2px solid #116dff'
                          //   : '',
                        }}
                        className={islargeDesktop ? classes.largeRadioBox : classes.radioBox}
                      >
                        {/* <Radio
                          style={{
                            backgroundColor:
                              pm.label === 'white'
                                ? '#fff'
                                : pm.label === 'navy'
                                ? '#262d4f '
                                : pm.label === 'black'
                                ? '#121616'
                                : '',
                            border: selectedVariants[product._id]?.includes(pm.id)
                              ? '2px solid #116DFF'
                              : pm.label === '#ffffff'
                              ? '1px solid #00000066'
                              : '',
                            // border: selectedVariants[product._id]?.includes(pm.id)
                            //   ? pm.label === '#ffffff'
                            //     ? ''
                            //     : '2px solid #116dff'
                            //   : '',
                          }}
                          value={pm.label}
                            sx={{
                              color:
                                pm.label === 'white'
                                  ? '#ffffff'
                                  : pm.label === 'navy'
                                  ? '#262d4f '
                                  : pm.label === 'black'
                                  ? '#121616'
                                  : '',

                              '&.Mui-checked': {
                                color:
                                  pm.label === 'white'
                                    ? '#ffffff'
                                    : pm.label === 'navy'
                                    ? '#262d4f '
                                    : pm.label === 'black'
                                    ? '#121616'
                                    : '',
                                border: 'none',
                                boxShadow: '0px 5px 5px 2px rgba(0,0,0,0.4)',
                              },
                            }}
                            className={classes.radioButton}
                        /> */}
                        <Radio
                          checked={pm.label === check}
                          onClick={e => setCheck(e.target.value)}
                          sx={{
                            color:
                              pm.label === 'white'
                                ? '#FFFFFF'
                                : pm.label === 'navy'
                                ? '#262D4F '
                                : pm.label === 'black'
                                ? '#121616'
                                : '',

                            '&.Mui-checked': {
                              color:
                                pm.label === 'white'
                                  ? '#FFFFFF'
                                  : pm.label === 'navy'
                                  ? '#262D4F '
                                  : pm.label === 'black'
                                  ? '#121616'
                                  : '',
                              border: 'none',
                              boxShadow: '0px 5px 5px 2px rgba(0,0,0,0.4)',
                            },
                          }}
                          style={{
                            backgroundColor:
                              pm.label === 'white'
                                ? '#fff'
                                : pm.label === 'navy'
                                ? '#262d4f '
                                : pm.label === 'black'
                                ? '#121616'
                                : '',
                            border: selectedVariants[product._id]?.includes(pm.id)
                              ? '2px solid #116dff'
                              : pm.label === 'white'
                              ? '1px solid #00000066'
                              : '',
                          }}
                          value={pm.label}
                          className={classes.radioButton}
                        />
                      </Box>
                    </Grid>
                  ))}
              </Grid>
            </RadioGroup>
          </Grid>
        ) : (
          <Grid item md={12} xs={12}>
            <Grid container spacing={1} display="flex" justifyContent="center" alignItems="center">
              {product.colors.length !== 1 &&
                product.colors.label !== 'n/a' &&
                product.colors.map((pm, i) => (
                  <Grid key={`colors-${i}`} item md={2} xs={2}>
                    <Box
                      sx={{
                        border: selectedVariants[product._id]?.includes(pm.id)
                          ? '2px solid #116DFF'
                          : pm.label === '#ffffff'
                          ? '1px solid #00000066'
                          : '',
                        // border: selectedVariants[product._id]?.includes(pm.id)
                        //   ? pm.label === '#ffffff'
                        //     ? ''
                        //     : '2px solid #116dff'
                        //   : '',
                      }}
                      className={islargeDesktop ? classes.largeRadioBox : classes.radioBox}
                    >
                      <Checkbox
                        style={{
                          backgroundColor:
                            `${pm.label}` === 'transparent'
                              ? '#ffffff'
                              : pm.label === 'white'
                              ? '#ffffff'
                              : pm.label === 'navy'
                              ? '#262d4f '
                              : pm.label === 'black'
                              ? '#121616'
                              : '',
                          border: selectedVariants[product._id]?.includes(pm.id)
                            ? '1px solid #116dff'
                            : pm.label === 'white'
                            ? '1px solid #00000066'
                            : '',
                        }}
                        onChange={() => onVariantClick(event.target.value)}
                        checked={selectedVariants[product._id]?.includes(pm.id) ? true : false}
                        value={`${product._id},${pm.id}`}
                        sx={{
                          color:
                            `${pm.label}` === 'transparent'
                              ? '#ffffff'
                              : pm.label === 'white'
                              ? '#ffffff'
                              : pm.label === 'navy'
                              ? '#262d4f '
                              : pm.label === 'black'
                              ? '#121616'
                              : '',

                          '& .MuiSvgIcon-root': { fontSize: '1px !important' },
                          // border: '2px solid blue',

                          '&.Mui-checked': {
                            color:
                              pm.label === 'white'
                                ? '#ffffff'
                                : pm.label === 'navy'
                                ? '#262d4f '
                                : pm.label === 'black'
                                ? '#121616'
                                : '',
                          },
                        }}
                        className={classes.colorsCheckbox}
                      />
                    </Box>
                  </Grid>
                ))}
            </Grid>
          </Grid>
        )}
      </Grid>
      <div hidden>
        <img src={product?.backImage} />
      </div>
    </>
  );
};

export { ProductCard as default };
