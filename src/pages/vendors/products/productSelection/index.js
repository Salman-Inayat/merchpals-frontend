import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { baseURL } from '../../../../configs/const';
import { Grid, Button, Alert as MuiAlert, Snackbar } from '@mui/material';
import { Products } from '../../../home/steps';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ProductSelection = ({ designName }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [snackBarToggle, setSnackBarToggle] = useState({
    visible: false,
    type: 'success',
    message: 'Design added successfully',
  });

  useEffect(() => {
    if (!localStorage.getItem('MERCHPAL_AUTH_TOKEN')) {
      navigate('/login', { replace: true });
    } else {
      fetchProducts();
    }
  }, []);

  const fetchProducts = async () => {
    axios
      .get(`${baseURL}/products`)
      .then(response => {
        console.log({ response }, 'Calling products');
        setProducts(response.data.products);
      })
      .catch(err => {
        console.log({ err });
      });
  };

  const productSelectionCompleted = selectedProducts => {
    const data = {
      products: selectedProducts,
      design: JSON.stringify({
        base64Image: localStorage.getItem('design'),
        name: location.state.name,
        canvasJson: localStorage.getItem('designJSON'),
      }),
    };

    axios
      .post(`${baseURL}/store/add-design`, data, {
        headers: {
          Authorization: localStorage.getItem('MERCHPAL_AUTH_TOKEN'),
        },
      })
      .then(response => {
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
        }, 3000);
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
      <Snackbar
        open={snackBarToggle.visible}
        autoHideDuration={3000}
        onClose={handleSnackBarClose}
      >
        <Alert severity={snackBarToggle.type}>{snackBarToggle.message}</Alert>
      </Snackbar>
    </Grid>
  );
};

export default ProductSelection;
