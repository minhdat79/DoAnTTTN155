import instance from "../config/instance";

const getUserProfile = () => {
  return instance.get(`/profile`);
};
const updateUserProfile = (formData) => {
  return instance.post("/profile", formData);
};
const getAllUser = ({ page = 1, limit = 6, filters = {} }) => {
  const queryParams = new URLSearchParams({
    page,
    limit,
    ...filters,
  }).toString();
  return instance.get(`/user?${queryParams}`);
};
const deleteUser = (userId) => {
  return instance.delete(`/user/${userId}`);
};
const createNewUser = (formData) => {
  return instance.post(`/user`, formData);
};
const adminUpdateUser = (userId, formData) => {
  return instance.put(`/user/${userId}`, formData);
};
export {
  getUserProfile,
  updateUserProfile,
  getAllUser,
  deleteUser,
  createNewUser,
  adminUpdateUser,
};
