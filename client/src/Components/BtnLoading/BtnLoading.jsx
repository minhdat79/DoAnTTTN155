import { Button } from "antd";
import React from "react";

const BtnLoading = ({
  type = "primary",
  htmlType = "submit",
  className = "w-full py-5",
  loading,
  children,
}) => {
  return (
    <Button
      type={type}
      htmlType={htmlType}
      className={className}
      loading={loading}
      disabled={loading}
    >
      {children}
    </Button>
  );
};

export default BtnLoading;
