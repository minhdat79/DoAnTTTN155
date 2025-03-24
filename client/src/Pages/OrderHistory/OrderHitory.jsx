import { EyeOutlined, StarOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Divider,
  message,
  Modal,
  Rate,
  Row,
  Table,
  Tag,
} from "antd";
import React, { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
import { getOrderByUser, userUpdateStatus } from "../../service/orderService";
import { userReview } from "../../service/reviewService";
import { formatCurrencyVND } from "../../utils";
import OrderDetail from "../../Components/OrderDetail/OrderDetail";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const fetchData = async () => {
    const res = await getOrderByUser();
    if (res.status === 200) {
      setOrders(res.data);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Tên người nhận",
      dataIndex: "recipientName",
      key: "recipientName",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Số điện thoại nhận hàng",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (text) => formatCurrencyVND(text),
    },
    {
      title: "Phương thức thanh toán",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      render: (text) =>
        text === "cash" ? "Thanh toán khi nhận hàng" : "Thanh toán qua thẻ",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const statusLabels = {
          pending: "Đang chờ xử lý",
          cancel: "Đã hủy",
          processing: "Đang xử lý",
          delivered: "Đã giao hàng",
          vnpay: "Đã thanh toán qua vnpay",
        };

        return (
          <Tag
            color={
              status === "pending"
                ? "orange"
                : status === "cancel"
                ? "red"
                : "green"
            }
          >
            {statusLabels[status] || "Không xác định"}
          </Tag>
        );
      },
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <Button
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => viewDetails(record)}
          >
            Xem chi tiết
          </Button>
          {record.status === "delivered" ? (
            record.isRating ? (
              <Button
                type="default"
                className="bg-yellow-500 text-white"
                icon={<StarOutlined />}
                onClick={() => openReviewModal(record)}
              >
                Đánh giá
              </Button>
            ) : (
              <Button
                type="default"
                className="bg-yellow-500 text-white"
                icon={<StarOutlined />}
                disabled
              >
                Bạn đã đánh giá
              </Button>
            )
          ) : null}
          {record.status === "pending" ? (
            <Button
              type="default"
              danger
              icon={<MdCancel />}
              onClick={() => handleCancelOrder(record)}
            >
              Hủy đơn
            </Button>
          ) : null}
          {record.status === "cancel" ? (
            <Button type="default" danger icon={<MdCancel />} disabled>
              Đơn hàng đã hủy
            </Button>
          ) : null}
        </div>
      ),
    },
  ];
  const handleCancelOrder = (record) => {
    Modal.confirm({
      title: "Bạn có chắc chắn muốn hủy đơn?",
      content: "Hành động này sẽ không thể hoàn tác.",
      okText: "Xác nhận",
      cancelText: "Quay lại",
      onOk: async () => {
        try {
          await userUpdateStatus({ status: "cancel" }, record._id);
          message.success("Đơn hàng đã được hủy thành công");
          fetchData();
        } catch (error) {
          message.error("Có lỗi xảy ra khi hủy đơn");
        }
      },
    });
  };
  const openReviewModal = (order) => {
    setSelectedOrder(order);
    setIsReviewModalVisible(true);
  };
  const submitReview = async () => {
    if (!reviewRating || !reviewText.trim()) {
      return message.warning("Vui lòng nhập đầy đủ thông tin đánh giá!");
    }

    try {
      const reviewPromises = selectedOrder?.cart?.map((element) =>
        userReview({
          product: element.product._id,
          rating: reviewRating,
          comment: reviewText,
          orderId: selectedOrder._id,
        })
      );

      await Promise.all(reviewPromises);

      message.success("Đánh giá sản phẩm thành công");
      fetchData();
      setIsReviewModalVisible(false);
      setReviewRating(0);
      setReviewText("");
    } catch (error) {
      message.error(
        error?.response?.data?.message ||
          "Có lỗi xảy ra khi gửi đánh giá. Vui lòng thử lại!"
      );
    }
  };

  const viewDetails = (order) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedOrder(null);
  };
  const calculateTotal = () => {
    const totalProductPrice = selectedOrder?.cart?.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
    return totalProductPrice;
  };
  return (
    <div className="p-8 bg-gray-50">
      <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">
        Lịch sử đơn hàng
      </h1>
      {orders?.length ? (
        <>
          <Card className="shadow-xl rounded-xl bg-white">
            <Table
              columns={columns}
              dataSource={orders}
              rowKey="_id"
              pagination={{ pageSize: 5 }}
              bordered
            />
          </Card>
          <OrderDetail
            selectedOrder={selectedOrder}
            isModalVisible={isModalVisible}
            handleCancel={handleCancel}
          />
          <Modal
            title="Đánh giá đơn hàng"
            visible={isReviewModalVisible}
            onCancel={() => setIsReviewModalVisible(false)}
            footer={null}
          >
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">Đánh giá (1-5 sao):</h3>
                <Rate
                  allowHalf
                  value={reviewRating}
                  onChange={(value) => setReviewRating(value)}
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Nhận xét:</h3>
                <textarea
                  className="w-full p-2 border rounded"
                  rows={4}
                  placeholder="Nhập nhận xét của bạn"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                />
              </div>
              <div className="flex justify-end">
                <Button type="primary" onClick={submitReview}>
                  Gửi đánh giá
                </Button>
              </div>
            </div>
          </Modal>
        </>
      ) : (
        <span className="flex items-center justify-center font-bold text-xl">
          Không có đơn hàng nào
        </span>
      )}
    </div>
  );
};

export default OrderHistory;
