import { GET_PRICING_SUCCESS, GET_PRICING_FAILED } from '../types';

const initialState = {
  priceCalculation: {
    taxRate: 0,
    taxAmount: 0,
    shippingRate: 0,
    shippingAmount: 0,
    orderActualAmount: 0,
    amountWithTaxAndShipping: 0,
    taxError: '',
    shippingError: '',
  },
};

const getPricing = (state, payload) => ({
  ...state,
  priceCalculation: {
    taxError: '',
    shippingError: '',
    ...payload,
  },
});

const getPricingFail = (state, payload) => ({
  ...state,
  priceCalculation: {
    taxRate: 0,
    taxAmount: 0,
    shippingRate: 0,
    shippingAmount: 0,
    orderActualAmount: state.priceCalculation.orderActualAmount,
    amountWithTaxAndShipping: state.priceCalculation.orderActualAmount,
    taxError: payload,
  },
});

const printfulReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRICING_SUCCESS:
      return getPricing(state, action.payload);
    case GET_PRICING_FAILED:
      return getPricingFail(state, action.payload);
    default:
      return state;
  }
};

export { printfulReducer as default };
