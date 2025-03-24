import instance from "../config/instance";

const createNewReport = (formData) => {
  return instance.post(`/report`, formData);
};
const getAllReport = ({
  page = 1,
  limit = 6,
  searchText,
  filters = {},
  sort = {},
}) => {
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

  return instance.get(`/report?${queryParams}`);
};
const replyReportApi = (replyId, data) => {
  return instance.put(`/report/${replyId}`, data);
};
export { createNewReport, getAllReport, replyReportApi };
