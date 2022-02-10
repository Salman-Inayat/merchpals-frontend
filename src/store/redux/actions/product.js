import axios from '../../../configs/axios';
import { FETCH_PRODUCT_SUCCESS, FETCH_PRODUCT_FAILED } from '../types';

export const fetchProduct = (storeUrl, productId) => async dispatch => {
  axios
    .get(`/products/${storeUrl}/product/${productId}`)
    .then(response => {
      dispatch({
        type: FETCH_PRODUCT_SUCCESS,
        payload: response.data.product,
      });
    })
    .catch(err => dispatch({ type: FETCH_PRODUCT_FAILED }));
};
