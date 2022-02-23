import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { baseURL, dataURLtoFile } from '../../../../configs/const';
import { Grid, Button, Alert as MuiAlert, Snackbar } from '@mui/material';
import { Products } from '../../../home/steps';
import { fetchProducts } from '../../../../store/redux/actions/product';
import { useDispatch, useSelector } from 'react-redux';
import store from '../../../../store';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ProductSelection = ({ designName }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  // const [products, setProducts] = useState([]);
  const [snackBarToggle, setSnackBarToggle] = useState({
    visible: false,
    type: 'success',
    message: 'Design added successfully',
  });

  const products = useSelector(state => state.product.products);
  useEffect(() => {
    if (!localStorage.getItem('MERCHPAL_AUTH_TOKEN')) {
      navigate('/login', { replace: true });
    } else {
      dispatch(fetchProducts());
    }
  }, []);

  const postDataToURL = async (url, data) => {
    axios
      .put(url, data, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const productSelectionCompleted = selectedProducts => {
    let design = store.getState().design.design;
    design.designName = location.state.name;

    const form = new FormData();
    form.append('designName', design.designName);

    form.append('products', JSON.stringify([...selectedProducts]));

    axios
      .post(`${baseURL}/store/add-design`, form, {
        headers: {
          Authorization: localStorage.getItem('MERCHPAL_AUTH_TOKEN'),
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        console.log(response);

        const urls = response.data.response;

        const designaVariant1 = urls[0].imageUrl;
        const designaVariant2 = urls[1].imageUrl;
        const designaVariant3 = urls[2].imageUrl;
        const designaVariant4 = urls[3].imageUrl;
        const designaVariant5 = urls[4].imageUrl;
        const designJson = urls[5].imageUrl;

        const JSONBlob = new Blob([JSON.stringify(design.designJson)], {
          type: 'application/json',
        });

        postDataToURL(
          designaVariant1,
          dataURLtoFile(design.designImages[0].data, `${design.designImages[0].name}.png`),
        );
        postDataToURL(
          designaVariant2,
          dataURLtoFile(design.designImages[1].data, `${design.designImages[1].name}.png`),
        );
        postDataToURL(
          designaVariant3,
          dataURLtoFile(design.designImages[2].data, `${design.designImages[2].name}.png`),
        );
        postDataToURL(
          designaVariant4,
          dataURLtoFile(design.designImages[3].data, `${design.designImages[3].name}.png`),
        );
        postDataToURL(
          designaVariant5,
          dataURLtoFile(design.designImages[4].data, `${design.designImages[4].name}.png`),
        );

        postDataToURL(designJson, JSONBlob);

        localStorage.removeItem('design');
        localStorage.removeItem('selectedVariants');
        localStorage.removeItem('designJSON');

        setSnackBarToggle({
          visible: true,
          type: 'success',
          message: 'Design created successfully',
        });

        setTimeout(() => {
          navigate('/vendor/designs');
        }, 2000);
      })
      .catch(error => {
        setSnackBarToggle({
          visible: true,
          type: 'success',
          message: `Something went wrong. Hint: ${
            error?.response?.data?.message || 'Please try again!'
          }`,
        });
      });
  };

  const handleSnackBarClose = () => {
    setSnackBarToggle({
      visible: false,
    });
  };
  return (
    <Grid container>
      <Products
        products={products}
        designName={location.state.name}
        productSelectionCompleted={productSelectionCompleted}
      />
      <Snackbar open={snackBarToggle.visible} autoHideDuration={3000} onClose={handleSnackBarClose}>
        <Alert severity={snackBarToggle.type}>{snackBarToggle.message}</Alert>
      </Snackbar>
    </Grid>
  );
};

export default ProductSelection;
