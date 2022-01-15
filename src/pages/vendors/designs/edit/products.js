import { useState, useEffect } from 'react';
import { Grid, Button, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { baseURL } from '../../../../configs/const';
import LoggedInVendor from '../../../../layouts/LoggedInVendor';
import {ProductCardWithPricing } from '../../../../components/ProductCard';

const EditDesign = () => {
  const navigate = useNavigate();
  const { designId } = useParams();

  const [products, setProducts] = useState();
  useEffect(() => {
    getDesign();
  }, [designId]);

  const getDesign = async () => {
    axios
      .get(`${baseURL}/store/design/products/${designId}`, {
        headers: {
          Authorization: localStorage.getItem('MERCHPAL_AUTH_TOKEN'),
        },
      })
      .then(response => {
        console.log({ response });
        const tmpProducts = response.data.design.vendorProductIds.map(vp => ({
          productId: vp.productId,
          design: vp.designId.url,
          colors: vp.productMappings.map(pm => pm.color),
          image: vp.image,
          name: vp.name,
          slug: vp.slug
        }))
        setProducts(tmpProducts)
      })
      .catch(error => console.log({ error }));
  };

  const [selectedVariants, setSelectedVariants] = useState({});


  useEffect(() => {
    const existingVariants = localStorage.getItem('selectedVariants');
    if (existingVariants) {
      const formattedVariants = JSON.parse(existingVariants);
      setSelectedVariants(formattedVariants);
    } else {
        selectAllProductsAndVariants();
    }
  }, []);

  useEffect(() => {
    selectAllProductsAndVariants();
  }, [products])

  const selectAllProductsAndVariants = () => {
    let tmpVariants = {};
    if(!products){
      return
    }
    design.vendorProductIds.forEach(product => {
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
      const relatedProduct = design.vendorProductIds.find(p => p._id === productId);

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
      const colors = design.vendorProductIds.find(p => p._id === productId).colors;
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

console.log({ products });
  return (
    <LoggedInVendor>
      <Grid mt={5} container>
        <Grid justifyContent="flex-start" container>
          <Button onClick={() => navigate('/vendor/designs')}>
            Back to designs
          </Button>
        </Grid>
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
          >
            {products?.map((product, i) => (
              <Grid item md={4} mt={5} xs={6} key={`product-${i}`}>
                <ProductCardWithPricing
                  product={product}
                  onVariantClick={onVariantClick}
                  onProductClick={onProductClick}
                  selectedVariants={selectedVariants}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
              
      </Grid>
    </LoggedInVendor>
  );
};

export default EditDesign;
