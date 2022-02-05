import axios from '../../../configs/axios';
import { FETCH_STORE_SUCCESS, FETCH_STORE_FAILED } from '../types';

export const fetchStore = storeUrl => async dispatch => {
  axios
    .get(`/store/${storeUrl}`)
    .then(response => {
      dispatch({
        type: FETCH_STORE_SUCCESS,
        payload: response.data.store,
      });
    })
    .catch(err => dispatch({ type: FETCH_STORE_FAILED }));
};
