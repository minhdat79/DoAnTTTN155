import React, { useEffect, useState } from "react";
import qrcodeImg from "../../assets/img/payment/bc1eef4b-376d-4287-9d46-448535a6ad09.png";

const QrCodeForm = ({ onCancel, draftOrder }) => {
  const [timeLeft, setTimeLeft] = useState(240);

  useEffect(() => {
    if (timeLeft <= 0) {
      onCancel();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onCancel]);

  // Chuyển đổi giây thành phút và giây
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="p-6">
      <div className="flex flex-col items-center justify-center gap-2 w-full mb-4">
        <p className="font-bold text-2xl">Vui lòng thanh toán và xác nhận</p>

        <p className="text-lg text-gray-600 font-semibold">
          Thời gian còn lại:{" "}
          <span className="text-red-500 font-bold">{formatTime(timeLeft)}</span>
        </p>
      </div>
      <img src={qrcodeImg} alt="QR Code" />
      <div className="mt-4 flex flex-col items-center gap-2 mb-4">
        <p className="text-xl">
          Chủ tài khoản: <strong>VU MINH DAT</strong>
        </p>
        <p className="text-base text-red-400 font-bold">
          Nội dung thanh toán: DH_{draftOrder?._id}
        </p>
        <p className="text-xl">
          Số tài khoản: <strong>060273634013</strong>
        </p>
      </div>
    </div>
  );
};

export default QrCodeForm;
