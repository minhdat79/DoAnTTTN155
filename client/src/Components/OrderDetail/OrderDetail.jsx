import { Col, Divider, Modal, Row, Tag } from "antd";
import React from "react";
import { formatCurrencyVND } from "../../utils";
import { IMAGEURL } from "../../utils/constant";

const OrderDetail = ({ selectedOrder, isModalVisible, handleCancel }) => {
  const calculateTotal = () => {
    const totalProductPrice = selectedOrder?.cart?.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
    return totalProductPrice;
  };
  return (
    <Modal
      title={`Chi tiết đơn hàng - ${selectedOrder?._id}`}
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={null}
      width={1000}
      className="custom-modal"
    >
      {selectedOrder && (
        <div className="space-y-6">
          <div className="border-b pb-4">
            <h2 className="text-xl font-semibold text-gray-700">
              Thông tin người dùng
            </h2>
            <Row gutter={16}>
              <Col span={12}>
                <p>
                  <strong>ID người dùng:</strong> {selectedOrder.user._id}
                </p>
                <p>
                  <strong>Tên người dùng:</strong> {selectedOrder.user.userName}
                </p>
                <p>
                  <strong>Email:</strong> {selectedOrder.user.email}
                </p>
                <p>
                  <strong>Số điện thoại:</strong> {selectedOrder.user.phone}
                </p>
              </Col>
            </Row>
          </div>

          <div className="border-b pb-4">
            <h2 className="text-xl font-semibold text-gray-700">
              Thông tin đơn hàng
            </h2>
            <Row gutter={16}>
              <Col span={12}>
                <p>
                  <strong>Tên người nhận:</strong> {selectedOrder.recipientName}
                </p>
                <p>
                  <strong>Địa chỉ:</strong> {selectedOrder.address}
                </p>
                <p>
                  <strong>Số điện thoại:</strong> {selectedOrder.phone}
                </p>
              </Col>
              <Col span={12}>
                <p>
                  <strong>Tổng tiền:</strong>{" "}
                  {formatCurrencyVND(selectedOrder.totalAmount)}
                </p>
                <p>
                  <strong>Phương thức thanh toán:</strong>{" "}
                  {selectedOrder.paymentMethod === "cash"
                    ? "Thanh toán khi nhận hàng"
                    : "Thanh toán qua thẻ"}
                </p>
                <p>
                  <strong>Trạng thái:</strong>
                  <Tag
                    color={
                      selectedOrder.status === "pending" ? "orange" : "green"
                    }
                  >
                    {selectedOrder.status.charAt(0).toUpperCase() +
                      selectedOrder.status.slice(1)}
                  </Tag>
                </p>
                <p>
                  <strong>Ngày tạo:</strong>{" "}
                  {new Date(selectedOrder.createdAt).toLocaleString()}
                </p>
                <p>
                  <strong>Ngày cập nhật:</strong>{" "}
                  {new Date(selectedOrder.updatedAt).toLocaleString()}
                </p>
              </Col>
            </Row>
          </div>

          <h3 className="text-xl font-semibold text-gray-700 mt-6">
            Sản phẩm trong đơn hàng
          </h3>
          <Divider />
          <div className="space-y-4">
            {selectedOrder.cart.map((item) => (
              <div key={item._id} className="flex items-center space-x-4">
                <img
                  src={IMAGEURL + item.product.img}
                  alt={item.product.title}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div>
                  <p className="font-semibold">{item.product.title}</p>
                  <p>Số lượng: {item.quantity}</p>
                  <p>Kích cỡ: {item.size}</p>
                  <p className="font-semibold text-lg">
                    {formatCurrencyVND(item.product.price)}
                  </p>
                </div>
              </div>
            ))}
            <Divider />
            <div className="flex items-center gap-4">
              <span className="font-bold text-lg">Tổng số tiền</span>
              <span className="text-red-500 font-bold text-xl">
                {formatCurrencyVND(calculateTotal())}
              </span>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default OrderDetail;
