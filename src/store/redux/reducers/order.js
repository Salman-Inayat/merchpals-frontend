import { CREATE_ORDER_SUCCESS, CREATE_ORDER_FAILED, GENERAL_RESET } from '../types';

const initialState = {
  created: false,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ORDER_SUCCESS:
      return { ...state, created: true };
    case CREATE_ORDER_FAILED:
      return { ...state, created: false };
    case GENERAL_RESET:
      return { ...state, created: false };
    default:
      return state;
  }
};

export { orderReducer as default };
