import React, { useEffect, useState } from "react";
import {
  adminUpdateUser,
  createNewUser,
  deleteUser,
  getAllUser,
} from "../../../service/userService";
import { Table, message, Button, Space, Pagination, Spin, Modal } from "antd";
import useNotification from "../../../hooks/NotiHook";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import UserForm from "../../../Components/FormManage/UserForm";

const ManagerUser = () => {
  const openNotification = useNotification();
  const [listUser, setListUser] = useState([]);
  const [isShowModal, setIsShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [pagi, setPagi] = useState({
    limit: 4,
    page: 1,
    total: 1,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(false);

  const fetchData = async (page = 1, limit = 4) => {
    setLoading(true);
    try {
      const res = await getAllUser({ page, limit });
      if (res.status === 200) {
        setListUser(res.data.data);
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

  useEffect(() => {
    fetchData(pagi.page, pagi.limit);
  }, []);

  const handleEdit = (record) => {
    setEditUser(record);
    setIsShowModal(true);
  };

  const handleDelete = async (record) => {
    try {
      const res = await deleteUser(record._id);
      if (res.status === 200) {
        fetchData(pagi.page, pagi.limit);
        openNotification({
          type: "success",
          message: "Thông báo",
          description: `Xóa người dùng thành công`,
        });
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
      title: "Tên người dùng",
      dataIndex: "userName",
      key: "userName",
      render: (text) => <span className="text-sm">{text}</span>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email) => <span className="text-sm">{email}</span>,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      render: (phone) => <span className="text-sm">{phone}</span>,
    },
    {
      title: "Quyền",
      dataIndex: "roles",
      key: "roles",
      render: (roles) => (
        <div className="flex gap-1">
          {roles.map((role, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded"
            >
              {role}
            </span>
          ))}
        </div>
      ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => (
        <span className="text-sm">
          {new Date(createdAt).toLocaleDateString("vi-VN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space>
          <Button
            type="primary"
            onClick={() => handleEdit(record)}
            icon={<EditOutlined />}
          >
            Chỉnh sửa
          </Button>
          <Button
            danger
            onClick={() => handleDelete(record)}
            icon={<DeleteOutlined />}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];
  const handleAddNewUser = () => {
    setIsShowModal(true);
    if (editUser) setEditUser(null);
  };
  const handleSave = async (values) => {
    try {
      let res;
      if (editUser) {
        res = await adminUpdateUser(editUser._id, values);
      } else {
        res = await createNewUser(values);
      }
      if (res.status === 201) {
        setIsShowModal(false);
        openNotification({
          type: "success",
          message: "Thông báo",
          description: `Tạo người dùng hàng thành công`,
        });
        fetchData(pagi.page, pagi.limit);
      } else if (res.status === 200) {
        setIsShowModal(false);
        openNotification({
          type: "success",
          message: "Thông báo",
          description: `Cập nhật người dùng hàng thành công`,
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
  return (
    <div className="p-4">
      <span className="flex justify-center items-center text-3xl mb-10 font-bold uppercase">
        Quản lí Người dùng
      </span>
      <Button
        icon={<PlusOutlined />}
        type="primary"
        onClick={handleAddNewUser}
        style={{ marginBottom: 20 }}
      >
        Thêm mới
      </Button>
      <Spin spinning={loading}>
        <Table
          dataSource={listUser}
          columns={columns}
          rowKey="id"
          pagination={false}
        />
      </Spin>
      <div className="mt-4 flex justify-end">
        <Pagination
          current={pagi.page}
          pageSize={pagi.limit}
          total={pagi.total}
          onChange={(page, pageSize) => fetchData(page, pageSize)}
        />
      </div>
      <Modal
        title={
          editUser ? "Chỉnh sửa thông tin người dùng" : "Thêm mới người dùng"
        }
        visible={isShowModal}
        footer={null}
        onCancel={() => setIsShowModal(false)}
      >
        <UserForm
          initialValues={editUser ? editUser : null}
          onSave={handleSave}
          onCancel={() => setIsShowModal(false)}
        />
      </Modal>
    </div>
  );
};

export default ManagerUser;
