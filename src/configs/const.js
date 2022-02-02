export const baseURL = `${process.env.REACT_APP_SERVER_URL}/api/v1`;

export const calculateProfit = (price, shippingCost, costPrice) => {
  return (price - shippingCost - costPrice - (0.029 * price + 0.3)) * 0.7;
};

export const calculateOrderProfit = order => {
  const orderPrice = order.price;
  const productsTotal = order.products.reduce(
    (sum, curr) => sum + curr.vendorProduct.productId.basePrice,
    0,
  );
  const profit = orderPrice - (orderPrice * 0.029 + 0.3) - productsTotal;
  return (profit * 0.7).toFixed(2);
};
