import instance from "../config/instance";

const createOrder = (formData) => {
  return instance.post(`/order`, formData);
};
const userUpdateStatus = (formData, orderId) => {
  return instance.put(`/order-status/${orderId}`, formData);
};
const getOrderByUser = () => {
  return instance.get(`/order`);
};
const getAllOrder = ({ page = 1, limit = 6, filters = {} }) => {
  const queryParams = new URLSearchParams({
    page,
    limit,
    ...filters,
  }).toString();

  return instance.get(`/order/all?${queryParams}`);
};
const adminUpdateStatus = (formData, orderId) => {
  return instance.put(`/admin/order-status/${orderId}`, formData);
};
const createVnPayOrder = (formData) => {
  return instance.post(`/payment`, formData);
};
export {
  createOrder,
  getOrderByUser,
  userUpdateStatus,
  getAllOrder,
  adminUpdateStatus,
  createVnPayOrder,
};
