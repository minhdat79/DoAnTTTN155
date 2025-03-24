import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Result, Button, Card } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { userUpdateStatus } from "../../service/orderService";

const VnpayReturn = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const responseCode = queryParams.get("vnp_ResponseCode");
    const transactionStatus = queryParams.get("vnp_TransactionStatus");
    const vnp_OrderInfo = queryParams.get("vnp_OrderInfo");
    if (responseCode === "00" && transactionStatus === "00") {
      userUpdateStatus({ status: "vnpay" }, vnp_OrderInfo);
      setIsSuccess(true);
      localStorage.removeItem("cart");
    } else {
      userUpdateStatus({ status: "cancel" }, vnp_OrderInfo);
      setIsSuccess(false);
    }
  }, [location]);

  const handleContinue = () => {
    if (isSuccess) {
      navigate("/history-order");
    } else {
      navigate("/cart");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-md">
        <Result
          status={isSuccess ? "success" : "error"}
          icon={
            isSuccess ? (
              <CheckCircleOutlined className="text-green-500" />
            ) : (
              <CloseCircleOutlined className="text-red-500" />
            )
          }
          title={
            <div
              className={`text-xl font-medium ${
                isSuccess ? "text-green-600" : "text-red-600"
              }`}
            >
              {isSuccess ? "Thanh toán thành công" : "Thanh toán thất bại"}
            </div>
          }
          subTitle={
            <p className="text-gray-600">
              {isSuccess
                ? "Cảm ơn bạn đã đặt hàng. Đơn hàng của bạn đã được xác nhận."
                : "Rất tiếc, đã xảy ra lỗi trong quá trình thanh toán. Vui lòng thử lại."}
            </p>
          }
          extra={[
            <Button
              key="continue"
              type={isSuccess ? "primary" : "default"}
              className={`mt-4 ${
                isSuccess
                  ? "bg-green-600 hover:bg-green-700 border-green-600 text-white"
                  : "bg-blue-600 hover:bg-blue-700 border-blue-600 text-white"
              }`}
              onClick={handleContinue}
            >
              {isSuccess ? "Xem lịch sử đơn hàng" : "Quay lại giỏ hàng"}
            </Button>,
          ]}
        />
      </Card>
    </div>
  );
};

export default VnpayReturn;
