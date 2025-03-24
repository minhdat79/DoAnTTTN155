import instance from "../config/instance";

const getProductByType = (type, limit) => {
  return instance.get(`/product-type/${type}`, { params: { limit } });
};
const getAllProduct = ({
  page = 1,
  limit = 6,
  searchText,
  filters = {},
  sort = {},
}) => {
  // Tạo một đối tượng với các giá trị cần thiết
  const params = {
    page,
    limit,
    ...(searchText ? { searchText } : {}), // Thêm searchText nếu có giá trị
    ...filters, // Gộp thêm các bộ lọc
    ...sort,
  };

  // Lọc bỏ các giá trị undefined hoặc null
  const queryParams = new URLSearchParams(
    Object.entries(params).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null) {
        acc[key] = value;
      }
      return acc;
    }, {})
  ).toString();

  return instance.get(`/product?${queryParams}`);
};

const getProductDetail = (productId) => {
  return instance.get(`/product/${productId}`);
};
const createProduct = (formData) => {
  return instance.post(`/product`, formData);
};
const updateProduct = (formData, productId) => {
  return instance.put(`/product/${productId}`, formData);
};
const deleteProduct = (productId) => {
  return instance.delete(`/product/${productId}`);
};
const getProductQuantity = (productId) => {
  return instance.get(`/product-quantity/${productId}`);
};
const getProductSizes = (productId) => {
  return instance.get(`/product-size/${productId}`);
};
const getProductRate = () => {
  return instance.get("/product-top-rate");
};
const createProductQuantity = (productId, formData) => {
  return instance.post(`/product-quantity/${productId}`, formData);
};
const updateProductQuantity = (productId, formData) => {
  return instance.put(`/product-quantity/${productId}`, formData);
};
export {
  getProductByType,
  getProductDetail,
  getAllProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductQuantity,
  createProductQuantity,
  updateProductQuantity,
  getProductSizes,
  getProductRate,
};
