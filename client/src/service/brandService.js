import instance from "../config/instance";

const getAllBrand = ({ page = 1, limit = 6, filters = {} }) => {
  const queryParams = new URLSearchParams({
    page,
    limit,
    ...filters,
  }).toString();

  return instance.get(`/brand?${queryParams}`);
};
const deleteBrand = (brandId) => {
  return instance.delete(`/brand/${brandId}`);
};
const createBrand = (formData) => {
  return instance.post(`/brand`, formData);
};
const admiEditBrand = (formData, brandId) => {
  return instance.put(`/brand/${brandId}`, formData);
};
export { getAllBrand, deleteBrand, createBrand, admiEditBrand };
