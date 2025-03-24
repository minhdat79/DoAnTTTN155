import {
  BankOutlined,
  CheckCircleOutlined,
  CreditCardOutlined,
  DeleteOutlined,
  MinusOutlined,
  PlusOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Button, Input, Modal, message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QrCodeForm from "../../Components/FormManage/QrCodeForm";
import useNotification from "../../hooks/NotiHook";
import {
  createOrder,
  createVnPayOrder,
  userUpdateStatus,
} from "../../service/orderService";
import { formatCurrencyVND } from "../../utils";
import { IMAGEURL } from "../../utils/constant";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const openNotification = useNotification();
  const [showDeliveryForm, setShowDeliveryForm] = useState(false);
  const [showQrModal, setShowQRModal] = useState(false);
  const [draftOrder, setDraftOrder] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState({
    address: "",
    recipientName: "",
    phone: "",
  });
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [isProcessing, setIsProcessing] = useState(false);
  const navigator = useNavigate();

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    const user = localStorage.getItem("user");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const handleIncreaseQuantity = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity += 1;
    setCart(updatedCart);
  };

  const handleDecreaseQuantity = (index) => {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      setCart(updatedCart);
    }
  };

  const handleRemoveItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem("cart", updatedCart);
  };

  const handleSubmitDeliveryInfo = () => {
    if (
      !deliveryInfo.address ||
      !deliveryInfo.recipientName ||
      !deliveryInfo.phone
    ) {
      message.error("Vui lòng nhập đầy đủ thông tin giao hàng!");
    } else {
      message.success("Thông tin giao hàng đã được lưu!");
      setShowDeliveryForm(false);
    }
  };

  const calculateTotal = () => {
    const totalProductPrice = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    return totalProductPrice;
  };

  const handleCreateOrder = async () => {
    try {
      setIsProcessing(true);
      const filteredCart = cart.map((item) => ({
        product: item._id,
        productName: item.title,
        quantity: item.quantity,
        size: item.size,
      }));

      if (paymentMethod === "vnpay") {
        // Xử lý đặt hàng với VNPay
        const orderData = {
          ...deliveryInfo,
          paymentMethod: "draftVnpay",
          totalAmount: calculateTotal(),
          cart: filteredCart,
        };

        const res = await createVnPayOrder(orderData);
        if (res.status === 200) {
          window.location.href = res.data;
        } else {
          message.error("Không thể tạo giao dịch VNPay. Vui lòng thử lại sau!");
        }
      } else if (paymentMethod === "cash") {
        const res = await createOrder({
          ...deliveryInfo,
          paymentMethod: paymentMethod,
          totalAmount: calculateTotal(),
          cart: filteredCart,
        });

        if (res.status === 201) {
          message.success("Đặt hàng thành công");
          localStorage.removeItem("cart");
          navigator("/history-order");
        }
      } else if (paymentMethod === "credit") {
        const res = await createOrder({
          ...deliveryInfo,
          paymentMethod: paymentMethod,
          totalAmount: calculateTotal(),
          cart: filteredCart,
        });

        setDraftOrder(res.data);
        setShowQRModal(true);
      }
    } catch (error) {
      openNotification({
        type: "error",
        message: "Thông báo",
        error: error,
      });
    } finally {
      setIsProcessing(false);
      setShowPaymentModal(false);
    }
  };

  const handleCancelPaymentOnline = async () => {
    try {
      const res = await userUpdateStatus({ status: "cancel" }, draftOrder?._id);
      if (res) {
        setDraftOrder(null);
        setShowQRModal(false);
        openNotification({
          typpe: "error",
          message: "Thông báo",
          description: "Đơn hàng đã bị hủy",
        });
      }
    } catch (error) {}
  };

  const handleConfirmPaymentQrCode = () => {
    openNotification({
      message: "Thông báo",
      description: "Đặt hàng thành công",
    });
    localStorage.removeItem("cart");
    navigator("/history-order");
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Giỏ Hàng</h2>
      {cart.length ? (
        <>
          <div className="space-y-4">
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b py-4"
              >
                <div className="flex items-center">
                  <img
                    src={IMAGEURL + item.img}
                    alt={item.title}
                    className="w-20 h-20 object-cover mr-4"
                  />
                  <div>
                    <h3 className="text-lg">{item.title}</h3>
                    <p className="text-sm text-gray-500">Size: {item.size}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    icon={<MinusOutlined />}
                    onClick={() => handleDecreaseQuantity(index)}
                    size="small"
                  />
                  <span className="text-lg">{item.quantity}</span>
                  <Button
                    icon={<PlusOutlined />}
                    onClick={() => handleIncreaseQuantity(index)}
                    size="small"
                  />
                  <span className="ml-4">
                    {formatCurrencyVND(item.price * item.quantity)}
                  </span>
                  <Button
                    icon={<DeleteOutlined />}
                    onClick={() => handleRemoveItem(index)}
                    type="primary"
                    danger
                    size="small"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-start">
            <div>
              <div className="mt-6 flex justify-start">
                <Button
                  type="primary"
                  onClick={() => setShowDeliveryForm(true)}
                >
                  Nhập Thông Tin Giao Hàng
                </Button>
              </div>
              {deliveryInfo.address ? (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold">Thông Tin Giao Hàng</h3>
                  <p>Địa chỉ: {deliveryInfo.address}</p>
                  <p>Tên người nhận: {deliveryInfo.recipientName}</p>
                  <p>Số điện thoại: {deliveryInfo.phone}</p>
                </div>
              ) : (
                <div />
              )}
            </div>

            <div>
              <div className="mt-6 flex justify-end gap-6">
                <span className="text-lg">Tổng tiền:</span>
                <span className="text-lg font-semibold">
                  {formatCurrencyVND(calculateTotal())}
                </span>
              </div>

              <div className="flex items-center gap-6 justify-end">
                <div className="mt-6 flex justify-end">
                  <Button
                    type="primary"
                    onClick={() => setShowPaymentModal(true)}
                    className="px-6 py-4 font-bold"
                    disabled={!deliveryInfo.address}
                    loading={isProcessing}
                  >
                    Đặt Hàng
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <span className="flex justify-center items-center font-bold text-xl">
          Bạn không có sản phẩm nào trong giỏ hàng
        </span>
      )}
      {showQrModal ? (
        <Modal
          visible={showQrModal}
          onCancel={handleCancelPaymentOnline}
          footer={[
            <Button type="primary" danger onClick={handleCancelPaymentOnline}>
              Hủy
            </Button>,
            <Button type="primary" onClick={handleConfirmPaymentQrCode}>
              Xác nhận thanh toán
            </Button>,
          ]}
        >
          <QrCodeForm
            draftOrder={draftOrder}
            onCancel={handleCancelPaymentOnline}
          />
        </Modal>
      ) : null}

      <Modal
        visible={showPaymentModal}
        onCancel={() => setShowPaymentModal(false)}
        footer={[
          <Button
            type="primary"
            danger
            onClick={() => setShowPaymentModal(false)}
          >
            Hủy
          </Button>,
          <Button
            type="primary"
            onClick={handleCreateOrder}
            loading={isProcessing}
          >
            Xác nhận thanh toán
          </Button>,
        ]}
      >
        <h1 className="font-bold text-2xl flex justify-center">
          Chọn phương thức thanh toán
        </h1>
        <div className="flex gap-4 flex-col my-10">
          <Button
            className={`py-5 relative ${
              paymentMethod === "cash"
                ? "border-green-600 border text-green-600"
                : ""
            }`}
            icon={<ShoppingCartOutlined />}
            onClick={() => setPaymentMethod("cash")}
          >
            {paymentMethod === "cash" ? (
              <CheckCircleOutlined className="absolute top-1 right-2 text-green-700" />
            ) : null}
            Thanh Toán Khi Giao Hàng
          </Button>
          <Button
            className={`py-5 relative ${
              paymentMethod === "credit"
                ? "border-green-600 border text-green-600"
                : ""
            }`}
            icon={<CreditCardOutlined />}
            onClick={() => setPaymentMethod("credit")}
          >
            {paymentMethod === "credit" ? (
              <CheckCircleOutlined className="absolute top-1 right-2 text-green-700" />
            ) : null}
            Thanh Toán Qua Qr code
          </Button>
          <Button
            className={`py-5 relative ${
              paymentMethod === "vnpay"
                ? "border-green-600 border text-green-600"
                : ""
            }`}
            icon={<BankOutlined />}
            onClick={() => setPaymentMethod("vnpay")}
          >
            {paymentMethod === "vnpay" ? (
              <CheckCircleOutlined className="absolute top-1 right-2 text-green-700" />
            ) : null}
            Thanh Toán Qua VNPay
          </Button>
        </div>
      </Modal>

      <Modal
        className="min-w-[800px]"
        title="Thông Tin Giao Hàng"
        visible={showDeliveryForm}
        onCancel={() => setShowDeliveryForm(false)}
        footer={[
          <Button key="back" onClick={() => setShowDeliveryForm(false)}>
            Hủy
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleSubmitDeliveryInfo}
          >
            Lưu Thông Tin
          </Button>,
        ]}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Địa chỉ</label>
            <Input
              placeholder="Nhập địa chỉ giao hàng"
              value={deliveryInfo.address}
              onChange={(e) =>
                setDeliveryInfo({ ...deliveryInfo, address: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Tên người nhận</label>
            <Input
              placeholder="Nhập tên người nhận"
              value={deliveryInfo.recipientName}
              onChange={(e) =>
                setDeliveryInfo({
                  ...deliveryInfo,
                  recipientName: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Số điện thoại</label>
            <Input
              placeholder="Nhập số điện thoại"
              value={deliveryInfo.phone}
              onChange={(e) =>
                setDeliveryInfo({
                  ...deliveryInfo,
                  phone: e.target.value,
                })
              }
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Cart;
