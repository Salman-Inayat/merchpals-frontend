export const baseURL = `${process.env.REACT_APP_SERVER_URL}/api/v1`;
export const VENDOR_PROFIT_MARGIN = 0.7;
export const MERCHPALS_PROFIT_MARGIN = 0.3;
export const CANVAS_WIDTH_DESKTOP = 450;
export const CANVAS_HEIGHT_DESKTOP = 450;
export const CANVAS_WIDTH_MOBILE = 350;
export const CANVAS_HEIGHT_MOBILE = 350;
export const CANVAS_WIDTH_TABLET = 340;
export const CANVAS_HEIGHT_TABLET = 340;

export const calculateProfit = (price, shippingCost, costPrice) => {
  return (price - shippingCost - costPrice - (0.029 * price + 0.3)) * 0.7;
};

export const calculateOrderProfit = order => {
  const orderPrice = order.price;
  // const productsTotal = order.products.reduce(
  //   (sum, curr) => sum + curr.vendorProduct.productId.basePrice,
  //   0,
  // );
  const printfulCost = order.printfulOrderMetadata.costs.total;
  const profit = orderPrice - (orderPrice * 0.029 + 0.3) - printfulCost;
  return (profit * VENDOR_PROFIT_MARGIN).toFixed(2);
};

export const dataURLtoFile = (dataurl, filename) => {
  if (!dataurl) {
    return null;
  }
  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};

export const getJSONFromUrl = function (url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'json';
  xhr.onload = function () {
    var status = xhr.status;
    if (status === 200) {
      if (xhr.response === '') {
        callback(null, 'empty response');
      } else {
        callback(null, xhr.response);
      }
    } else {
      console.log('Request failed.  Returned status of ' + status);
      callback(status, xhr.response);
    }
  };
  xhr.send();
};
