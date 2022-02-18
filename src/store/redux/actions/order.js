import axios from '../../../configs/axios';
import { CREATE_ORDER_SUCCESS, CREATE_ORDER_FAILED, GENERAL_RESET } from '../types';

export const createOrder = data => async dispatch => {
  axios
    .post('/order', data)
    .then(res => {
      dispatch({ type: CREATE_ORDER_SUCCESS, payload: res.data.order.orderNo });
    })
    .catch(() => dispatch({ type: CREATE_ORDER_FAILED }));
};

export const resetOrder = () => async dispatch => dispatch({ type: GENERAL_RESET });
