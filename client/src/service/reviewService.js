import instance from "../config/instance";

const userReview = (formData) => {
  return instance.post(`/review`, formData);
};

export { userReview };
