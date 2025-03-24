import instance from "../config/instance";

const getSummaryTotal = () => {
  return instance.get(`/summary/total`);
};

const getSummaryUser = (type) => {
  return instance.get(`/summary/user/${type}`);
};
const getSummaryBrand = (type) => {
  return instance.get(`/summary/brand/${type}`);
};

const getSummaryProduct = (type) => {
  return instance.get(`/summary/product/${type}`);
};

const getSummaryOrder = (type) => {
  return instance.get(`/summary/order/${type}`);
};

export {
  getSummaryTotal,
  getSummaryBrand,
  getSummaryUser,
  getSummaryProduct,
  getSummaryOrder,
};
