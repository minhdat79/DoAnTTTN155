export const formatCurrencyVND = (amount) => {
  if (typeof amount !== "number") {
    throw new Error("Số tiền phải là kiểu số.");
  }
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};
export const formatDateTime = (date) => {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  return new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};

export const capitalizeFirstLetter = (str) => {
  if (typeof str !== "string") {
    throw new Error("Tham số phải là một chuỗi.");
  }
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
