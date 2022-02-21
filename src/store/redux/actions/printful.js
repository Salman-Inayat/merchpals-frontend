import axios from '../../../configs/axios';
import { GET_PRICING_SUCCESS, GET_PRICING_FAILED } from '../types';

export const getPriceCalculation = data => async dispatch => {
  if (!data.recipient.country_code) {
    return;
  }
  console.log('price calculate data ', data);
  axios
    .post(`/printful/calculate-price`, { data })
    .then(response => {
      console.log('billing change response', response);

      dispatch({
        type: GET_PRICING_SUCCESS,
        payload: response.data.payload,
      });
    })
    .catch(err => {
      dispatch({
        type: GET_PRICING_FAILED,
        payload:
          err.response?.data?.message ||
          'Something went wrong. Please try again in a while. Thank You!',
      });
    });
};
export const getInitializePriceCalculation = data => async dispatch => {
  console.log('price calculate data ', data);
  dispatch({
    type: GET_PRICING_SUCCESS,
    payload: data,
  });
};
