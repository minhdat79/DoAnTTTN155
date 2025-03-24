import React, { useEffect, useState } from "react";
import { Table, Button, Space, message, Select } from "antd";
import { adminUpdateStatus, getAllOrder } from "../../../service/orderService";
import OrderDetail from "../../../Components/OrderDetail/OrderDetail";
import useNotification from "../../../hooks/NotiHook";
import { MdDetails } from "react-icons/md";
import { EyeOutlined } from "@ant-design/icons";
import { formatCurrencyVND } from "../../../utils";

const ManagerOrder = () => {
  const openNotification = useNotification();
  const [listOrder, setListOrder] = useState([]);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [pagi, setPagi] = useState({
    limit: 4,
    page: 1,
    total: 1,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(false);

  const fetchData = async (page = 1, limit = 10) => {
    setLoading(true);
    try {
      const res = await getAllOrder({ page, limit });
      if (res.status === 200) {
        setListOrder(res.data.data);
        setPagi({
          limit: res.data.meta.limit,
          page: res.data.meta.page,
          total: res.data.meta.total,
          totalPages: res.data.meta.totalPages,
        });
      }
    } catch (error) {
      openNotification({
        type: "error",
        message: "Thông báo",
        error: error,
      });
    } finally {
      setLoading(false);
    }
  };
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await adminUpdateStatus(
        {
          status: newStatus,
        },
        orderId
      );
      if (response.status === 200) {
        openNotification({
          message: "Thông báo",
          description: "Cập nhật trạng thái thành công",
        });
        fetchData(pagi.page, pagi.limit);
      }
    } catch (error) {
      openNotification({
        type: "error",
        message: "Thông báo",
        error: error,
      });
    }
  };
  const columns = [
    {
      title: "Mã đơn",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Tên người nhận",
      dataIndex: "recipientName",
      key: "recipientName",
    },
    {
      title: "Địa chỉ nhận",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Số điện thoại nhận",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Sản phẩm",
      dataIndex: "cart",
      key: "cart",
      render: (cart) => (
        <div>
          {cart.map((item, index) => (
            <div key={index}>
              <strong>{item.product.title}</strong> - {item.quantity} x{" "}
              {formatCurrencyVND(item.product.price)}
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (amount) => <span>{formatCurrencyVND(amount)}</span>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Select
          value={status}
          onChange={(newStatus) => handleStatusChange(record._id, newStatus)}
          style={{ width: 120 }}
        >
          <Option value="pending">Đang chờ xử lý</Option>
          <Option value="processing">Đang xử lý</Option>
          <Option value="delivered">Đã giao hàng</Option>
          <Option value="cancel">Hủy bỏ</Option>
        </Select>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <Button
          type="primary"
          icon={<EyeOutlined />}
          onClick={() => handleViewDetail(record)}
        >
          Xem chi tiết
        </Button>
      ),
    },
  ];
  const handleViewDetail = (order) => {
    setShowDetailModal(true);
    setSelectedOrder(order);
  };

  const handleTableChange = (pagination) => {
    fetchData(pagination.current, pagination.pageSize);
  };

  useEffect(() => {
    fetchData(pagi.page, pagi.limit);
  }, []);

  return (
    <div className="p-4">
      <span className="flex justify-center items-center text-3xl mb-4 font-bold uppercase">
        Quản lí Đơn hàng
      </span>
      <Table
        columns={columns}
        dataSource={listOrder}
        rowKey="_id"
        loading={loading}
        pagination={{
          current: pagi.page,
          pageSize: pagi.limit,
          total: pagi.total,
          showSizeChanger: true,
        }}
        onChange={handleTableChange}
      />
      <OrderDetail
        handleCancel={() => setShowDetailModal(false)}
        selectedOrder={selectedOrder}
        isModalVisible={showDetailModal}
      />
    </div>
  );
};

export default ManagerOrder;
