import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  ADD_QUANTITY,
  SUB_QUANTITY,
  EMPTY_CART,
  GET_CART,
} from '../types';

const initialState = {
  stringifyCart: '',
  cart: {
    store: '',
    products: [], // order => [{variant_id, productMapping, quantity}]
  },
};
const addToCart = (state, payload) => {
  const stringifyCart = JSON.stringify({ ...payload });
  localStorage.setItem('MERCHPALS_CART', stringifyCart);
  return { ...state, stringifyCart };
};

const getCart = (state, store) => {
  let cart = {};
  if (state.stringifyCart) {
    cart = JSON.parse(state.stringifyCart);
  } else {
    cart = JSON.parse(localStorage.getItem('MERCHPALS_CART'));
  }

  if (!cart?.store) {
    return { state, cart: { store: '', products: [] } };
  }

  if (cart.store !== store) {
    return { state, cart: { store, products: [] } };
  }

  return { ...state, cart };
};

const emptyCart = state => {
  localStorage.removeItem('MERCHPALS_CART');
  return {
    stringifyCart: '',
    cart: {
      store: '',
      products: [],
    },
  };
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

const cartReducer = (state = initialState, action) => {
  let doesItemExist;
  switch (action.type) {
    case ADD_TO_CART: {
      return addToCart(state, action.payload);
    }

    case GET_CART:
      return getCart(state, action.payload);

    case REMOVE_FROM_CART: {
      return removeFromCart(state, action);
    }

    case ADD_QUANTITY:
      return addQuantity(state, action);

    case SUB_QUANTITY:
      return subQuantity(state, action);

    case EMPTY_CART:
      return emptyCart();

    default:
      return state;
  }
};

export { cartReducer as default };
