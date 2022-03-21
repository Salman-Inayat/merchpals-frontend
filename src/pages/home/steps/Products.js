import { useEffect, useState } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ProductCard from '../../../components/ProductCard/ProductCard';
import { useMediaQuery } from 'react-responsive';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedVariants, updateSelectedVariants } from '../../../store/redux/actions/product';

const useStyles = makeStyles(theme => ({
  footer: {
    maxWidth: '100%',

    padding: '10px 0px',
    [theme.breakpoints.down('sm')]: {
      position: 'fixed',
      bottom: '0',
      backgroundColor: '#ccc',
      opacity: 1,
    },
  },
  btn: {
    color: '#fff',
    margin: '0rem 0.5rem',
    fontSize: '18px',
    '&:hover': {
      backgroundColor: '#aaa',
    },
  },
  unselectBtn: {
    color: '#000',
    margin: '0rem 0.5rem',
    border: '1px solid #000',
    fontSize: '18px',
    '&:hover': {
      backgroundColor: '#aaa',
    },
  },
  productsContainer: {
    padding: '0 22%',
    [theme.breakpoints.down('sm')]: {
      padding: '0.2rem',
    },
  },
  ProductCard: {
    padding: '2% 4% 0px 4%',
    // [theme.breakpoints.up('xl')]: {
    //   padding: '20px 5rem',
    // },
    [theme.breakpoints.down('sm')]: {
      padding: '20px 1% 0px 1%',
    },
  },
  smallScreen: {
    [theme.breakpoints.down('sm')]: {
      marginBottom: '15%',
    },
  },
}));

const Products = ({ productSelectionCompleted = () => {}, products = [], designName }) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const dispatch = useDispatch();
  const [unselectProducts, setUnselectProducts] = useState(false);
  const { selectedVariants } = useSelector(state => state.product);
  const [unselectProductId, setUnselectProductId] = useState();

  useEffect(() => {
    dispatch(getSelectedVariants());
  }, [products]);

  const onVariantClick = productVariant => {
    const [product, color] = productVariant.split(',');
    let removedProduct = false;
    let productColors = [];
    let updatedVariants = {};

    if (!selectedVariants[product]) {
      productColors = [Number(color)];
    } else {
      const colorIndex = selectedVariants[product].findIndex(c => c === Number(color));

      if (colorIndex > -1) {
        productColors = [...selectedVariants[product]];

        if (productColors.length === 1) {
          let prevSelectedProducts = { ...selectedVariants };
          delete prevSelectedProducts[product];
          removedProduct = true;

          updatedVariants = {
            ...prevSelectedProducts,
          };
        } else {
          productColors.splice(colorIndex, 1);
        }
      } else {
        productColors = [...selectedVariants[product], Number(color)];
      }
    }

    if (!removedProduct) {
      updatedVariants = {
        ...selectedVariants,
        [product]: [...new Set(productColors)],
      };
    }

    dispatch(updateSelectedVariants(updatedVariants));
  };

  const onProductClick = productId => {
    let prevSelectedProducts = { ...selectedVariants };
    setUnselectProductId(productId);
    if (prevSelectedProducts[productId]) {
      delete prevSelectedProducts[productId];
      dispatch(
        updateSelectedVariants({
          ...prevSelectedProducts,
        }),
      );
    } else {
      const relatedProduct = products.find(p => p._id === productId);

      const variantsOfProduct = relatedProduct.colors.reduce((color, curr) => {
        const relatedMappings = curr.relatedProductVariantsId.map(p => p.color.value);
        return [...color, ...relatedMappings];
      }, []);

      const uniqVariantIds = variantsOfProduct.filter(function (item, pos) {
        return variantsOfProduct.indexOf(item) == pos;
      });

      const updatedVariants = {
        ...selectedVariants,
        [productId]: [...uniqVariantIds],
      };

      dispatch(updateSelectedVariants(updatedVariants));
    }
  };

  const formatAndContinue = () => {
    const selectedProducts = Object.keys(selectedVariants);
    const formattedVariants = selectedProducts.map(productId => {
      const productsSelectedVariants = selectedVariants[productId];
      let productMappingsIds = [];
      const colors = products.find(p => p._id === productId).colors;
      productsSelectedVariants.forEach(psv => {
        const allColorsArrs = colors.filter(c => c.id === psv);
        const productMappings = allColorsArrs.reduce(
          (mapArr, cur) => [...mapArr, ...cur.relatedProductVariantsId],
          [],
        );
        productMappingsIds.push(...productMappings.map(rp => rp._id));
      });

      return { productId, productMappings: productMappingsIds };
    });

    productSelectionCompleted(formattedVariants);
  };

  const handleUnselectProducts = () => {
    setUnselectProducts(!unselectProducts);
  };

  return (
    <>
      <Grid container className={classes.smallScreen}>
        {/* <Grid container justifyContent="center" alignItems="center"> */}
        <Grid item xs={12} justifyContent="flex-start" alignItems="flex-start">
          <Grid item md={12} sm={12} xs={12}>
            <Typography align="center" variant="h3" style={{ color: '#000' }}>
              Save Your Merch
            </Typography>
          </Grid>
          <Grid item md={12} container className={classes.productsContainer}>
            {products.map((product, i) => (
              <Grid item md={4} xs={6} key={`product-${i}`} className={classes.ProductCard}>
                <ProductCard
                  product={product}
                  designName={designName}
                  onVariantClick={onVariantClick}
                  onProductClick={onProductClick}
                  selectedVariants={selectedVariants}
                  unselectProducts={unselectProducts}
                  unselectProductId={unselectProductId}
                />
              </Grid>
            ))}
          </Grid>
          {/* </Grid> */}
        </Grid>
      </Grid>
      <Grid container className={classes.footer}>
        <Grid item md={12} xs={12} display="flex" justifyContent="center" alignItems="center">
          <Button
            onClick={handleUnselectProducts}
            className={[classes.btn, classes.unselectBtn].join(' ')}
            size="large"
            color="primary"
            variant="outlined"
          >
            {unselectProducts ? 'Done' : 'Unselect'}
          </Button>
          <Button
            onClick={formatAndContinue}
            className={classes.btn}
            size="large"
            color="primary"
            variant="contained"
          >
            Save &#38; Continue
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export { Products as default };
