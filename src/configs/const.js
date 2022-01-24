export const baseURL = `${process.env.REACT_APP_SERVER_URL}/api/v1`;

export const calculateProfit = (price, shippingCost, costPrice) => {
  return (price - shippingCost - costPrice - (0.029 * price + 0.3)) * 0.7;
};
