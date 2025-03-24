import { notification } from "antd";

const useNotification = () => {
  const descriptions = {
    error: (error) =>
      error?.response?.data?.message
        ? error?.response.data?.message
        : "Xảy ra lỗi",
    success: "Operation was successful",
    info: "Here is some information",
    warning: "This is a warning",
  };

  const openNotification = ({
    type = "success",
    message = "Thông báo",
    description,
    duration = 4.5,
    error,
  }) => {
    notification[type]({
      message,
      description:
        description ||
        (type === "error" && error
          ? descriptions[type](error)
          : descriptions[type]),
      duration,
      placement: "bottomRight",
    });
  };

  notification.config({
    maxCount: 3,
  });

  return openNotification;
};

export default useNotification;
