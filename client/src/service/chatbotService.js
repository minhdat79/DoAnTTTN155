import instance from "../config/instance";

const gerateDataApi = () => {
  return instance.get(`/gerate-data`);
};
const trainModalApi = () => {
  return instance.get(`/train`);
};
const checkModalApi = () => {
  return instance.get(`/check-modal`);
};
const chatWithApi = (formData) => {
  return instance.post(`/chat`, formData);
};

export { trainModalApi, gerateDataApi, checkModalApi, chatWithApi };
