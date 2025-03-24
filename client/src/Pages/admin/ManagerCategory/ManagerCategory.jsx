import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Popconfirm, Table } from "antd";
import React, { useEffect, useState } from "react";
import CategoryForm from "../../../Components/FormManage/CategoryForm";
import useNotification from "../../../hooks/NotiHook";
import { deleteBrand } from "../../../service/brandService";
import {
  admiEditCategory,
  createCategory,
  getAllCategory,
} from "../../../service/categoryService";
import { formatDateTime } from "../../../utils";

const ManagerCategory = () => {
  const openNotification = useNotification();
  const [listCategory, setListCategory] = useState([]);
  const [isShowModal, setIsShowModal] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
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
      const res = await getAllCategory({ page, limit });
      if (res.status === 200) {
        setListCategory(res.data.data);
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

  const handleEdit = (brand) => {
    setEditCategory(brand);
    setIsShowModal(true);
  };

  const handleDelete = async (brandId) => {
    try {
      const res = await deleteBrand(brandId);
      if (res.status === 200) {
        openNotification({
          type: "success",
          message: "Thông báo",
          description: `Brand with ID ${brandId} deleted successfully!`,
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

  const handleAddNew = () => {
    setIsShowModal(true);
    if (editCategory) setEditCategory(null);
  };

  const columns = [
    {
      title: "Tên nhãn hàng",
      dataIndex: "name",
      key: "name",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      render: (text) => <span className="line-clamp-2 max-w-80">{text}</span>,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => <span>{formatDateTime(createdAt)}</span>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div>
          <Button
            onClick={() => handleEdit(record)}
            style={{ marginRight: 10 }}
            type="primary"
            icon={<EditOutlined />}
          >
            Chỉnh sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa thương hiệu này?"
            onConfirm={() => handleDelete(record._id)}
            okText="Có"
            cancelText="Không"
          >
            <Button danger icon={<DeleteOutlined />}>
              Xóa
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetchData(pagi.page, pagi.limit);
  }, [pagi.page, pagi.limit]);
  const handleSave = async (values) => {
    try {
      let res;
      if (editCategory) {
        res = await admiEditCategory(values, editCategory._id);
      } else {
        res = await createCategory(values);
      }
      if (res.status === 201) {
        setIsShowModal(false);
        openNotification({
          type: "success",
          message: "Thông báo",
          description: `Tạo nhãn hàng thành công`,
        });
        fetchData(pagi.page, pagi.limit);
      } else if (res.status === 200) {
        setIsShowModal(false);
        openNotification({
          type: "success",
          message: "Thông báo",
          description: `Cập nhật nhãn hàng thành công`,
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
    <div>
      <span className="flex justify-center items-center text-3xl mb-4 font-bold uppercase">
        Quản lí thể loại
      </span>
      <Button
        icon={<PlusOutlined />}
        type="primary"
        onClick={handleAddNew}
        style={{ marginBottom: 20 }}
      >
        Thêm mới
      </Button>
      <Table
        columns={columns}
        dataSource={listCategory}
        loading={loading}
        rowKey="_id"
        pagination={{
          current: pagi.page,
          pageSize: pagi.limit,
          total: pagi.total,
          onChange: (page, pageSize) =>
            setPagi({ ...pagi, page, limit: pageSize }),
        }}
      />
      {isShowModal ? (
        <Modal
          title={editCategory ? "Chỉnh sửa thể loại" : "Thêm mới thể loại"}
          visible={isShowModal}
          footer={null}
          onCancel={() => setIsShowModal(false)}
        >
          <CategoryForm
            initialValues={editCategory ? editCategory : null}
            onSave={handleSave}
            onCancel={() => setIsShowModal(false)}
          />
        </Modal>
      ) : null}
    </div>
  );
};

export default ManagerCategory;
