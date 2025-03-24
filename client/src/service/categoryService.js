import instance from "../config/instance";

const getAllCategory = ({ page = 1, limit = 6, filters = {} }) => {
  const queryParams = new URLSearchParams({
    page,
    limit,
    ...filters,
  }).toString();

  return instance.get(`/category?${queryParams}`);
};
const deleteCategory = (categoryId) => {
  return instance.delete(`/category/${categoryId}`);
};
const createCategory = (formData) => {
  return instance.post(`/category`, formData);
};
const admiEditCategory = (formData, categoryId) => {
  return instance.put(`/category/${categoryId}`, formData);
};
export { getAllCategory, deleteCategory, createCategory, admiEditCategory };
