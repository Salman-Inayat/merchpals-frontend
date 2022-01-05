import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  ADD_QUANTITY,
  SUB_QUANTITY,
  EMPTY_CART,
} from '../types';

const addToCart = (doesItemExist, state, action) => {
  doesItemExist = false;
  const newState = state.map(item => {
    if (item.id == action.payload.id) {
      item.quantity += 1;
      doesItemExist = true;
    }
    return item;
  });
  if (doesItemExist) {
    return newState;
  }
  return [...state, { ...action.payload, quantity: 1 }];
};

const removeFromCart = (state, action) => {
  return state.filter(item => item.id !== action.payload);
};

const addQuantity = (state, action) => {
  return state.map(item => {
    if (item.id == action.payload) {
      item.quantity += 1;
    }
    return item;
  });
};

const subQuantity = (state, action) => {
  return state.map(item => {
    if (item.id == action.payload) {
      item.quantity -= 1;
    }
    return item;
  });
};

const cartReducer = (state = [], action) => {
  let doesItemExist;
  switch (action.type) {
    case ADD_TO_CART: {
      return addToCart(doesItemExist, state, action);
    }

    case REMOVE_FROM_CART: {
      return removeFromCart(state, action);
    }

    case ADD_QUANTITY:
      return addQuantity(state, action);

    case SUB_QUANTITY:
      return subQuantity(state, action);

    case EMPTY_CART:
      return [];

    default:
      return state;
  }
};

export { cartReducer as default };
