import { FETCH_STORE_SUCCESS, FETCH_STORE_FAILED } from '../types';

const initialState = {
  store: null,
};

const storeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STORE_SUCCESS:
      return { ...state, store: action.payload };
    default:
      return state;
  }
};

export { storeReducer as default };
