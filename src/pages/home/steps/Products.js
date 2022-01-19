import { useEffect, useState } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ProductCard from '../../../components/ProductCard/ProductCard';
import { useMediaQuery } from 'react-responsive';

const useStyles = makeStyles(theme => ({
  footer: {
    // backgroundColor: '#babdb3',
    maxWidth: '100%',
    // position: 'fixed',
    bottom: '0',
    padding: '10px 0px',
  },
  btn: {
    color: '#fff',
    fontSize: '18px',
    '&:hover': {
      backgroundColor: '#aaa',
    },
  },
  productsContainer: {
    padding: '2rem 10rem',
    [theme.breakpoints.down('sm')]: {
      padding: '0.2rem',
    },
  },
}));
const Products = ({
  productSelectionCompleted = () => {},
  products = [],
  designName,
}) => {
  const [selectedVariants, setSelectedVariants] = useState({});
  const classes = useStyles();
  const isDesktop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    const existingVariants = localStorage.getItem('selectedVariants');
    if (existingVariants) {
      const formattedVariants = JSON.parse(existingVariants);
      setSelectedVariants(formattedVariants);
    } else {
      selectAllProductsAndVariants();
    }
  }, []);

  const selectAllProductsAndVariants = () => {
    let tmpVariants = {};

    products.forEach(product => {
      const variantsOfProduct = product.colors.reduce((color, curr) => {
        const relatedMappings = curr.relatedProductVariantsId.map(p => p.color);
        return [...color, ...relatedMappings];
      }, []);

      const uniqVariantIds = variantsOfProduct.filter(function (item, pos) {
        return variantsOfProduct.indexOf(item) == pos;
      });

      tmpVariants = {
        ...tmpVariants,
        [product._id]: [...uniqVariantIds],
      };

      setSelectedVariants(tmpVariants);
    });

    localStorage.setItem('selectedVariants', JSON.stringify(tmpVariants));
  };

  const onVariantClick = productVariant => {
    const [product, color] = productVariant.split(',');
    // console.log({ product, color });
    let removedProduct = false;
    let productColors = [];
    let updatedVariants = {};

    if (!selectedVariants[product]) {
      productColors = [color];
    } else {
      const colorIndex = selectedVariants[product].findIndex(c => c === color);

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
        productColors = [...selectedVariants[product], color];
      }
    }

    if (!removedProduct) {
      updatedVariants = {
        ...selectedVariants,
        [product]: [...new Set(productColors)],
      };
    }

    setSelectedVariants(updatedVariants);
    localStorage.setItem('selectedVariants', JSON.stringify(updatedVariants));
  };

  const onProductClick = productId => {
    let prevSelectedProducts = { ...selectedVariants };

    if (prevSelectedProducts[productId]) {
      delete prevSelectedProducts[productId];
      setSelectedVariants({
        ...prevSelectedProducts,
      });
    } else {
      const relatedProduct = products.find(p => p._id === productId);

      const variantsOfProduct = relatedProduct.colors.reduce((color, curr) => {
        const relatedMappings = curr.relatedProductVariantsId.map(p => p.color);
        return [...color, ...relatedMappings];
      }, []);

      const uniqVariantIds = variantsOfProduct.filter(function (item, pos) {
        return variantsOfProduct.indexOf(item) == pos;
      });

      const updatedVariants = {
        ...selectedVariants,
        [productId]: [...uniqVariantIds],
      };

      setSelectedVariants(updatedVariants);
      localStorage.setItem('selectedVariants', JSON.stringify(updatedVariants));
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
        console.log({ productMappingsIds });
      });

      return { productId, productMappings: productMappingsIds };
    });

    productSelectionCompleted(formattedVariants);
  };

  console.log({ selectedVariants });
  return (
    <Grid container>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        mt={5}
        pb={18}
      >
        <Grid
          item
          xs={12}
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={3}
        >
          <Grid item md={12} sm={12} xs={12}>
            <Typography
              align="center"
              variant="h3"
              style={{ color: '#0097a7' }}
            >
              Product Selection
            </Typography>
            <Typography
              align="center"
              variant="h5"
              style={{ fontWeight: 'normal' }}
            >
              Please select products for your design
            </Typography>
          </Grid>
          <Grid
            container
            spacing={isMobile ? 1 : 14}
            className={classes.productsContainer}
          >
            {products.map((product, i) => (
              <Grid item md={4} mt={5} xs={6} key={`product-${i}`}>
                <ProductCard
                  product={product}
                  designName={designName}
                  onVariantClick={onVariantClick}
                  onProductClick={onProductClick}
                  selectedVariants={selectedVariants}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        className={classes.footer}
      >
        <Button
          onClick={formatAndContinue}
          className={classes.btn}
          size="large"
          color="primary"
          variant="contained"
        >
          Continue
        </Button>
      </Grid>
    </Grid>
  );
};

export { Products as default };
