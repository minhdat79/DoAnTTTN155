import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Image, Modal, Pagination, Space, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import ProductForm from "../../../Components/FormManage/ProductForm";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  updateProduct,
} from "../../../service/productService";
import { formatCurrencyVND } from "../../../utils";
import useNotification from "../../../hooks/NotiHook";
import { IMAGEURL } from "../../../utils/constant";
import { useNavigate } from "react-router-dom";

const ManagerProduct = () => {
  const openNotification = useNotification();
  const navigator = useNavigate();
  const [listProduct, setListProduct] = useState([]);
  const [isShowModal, setIsShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
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
      const res = await getAllProduct({ page, limit });
      if (res.status === 200) {
        setListProduct(res.data.data);
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
    setEditProduct(record);
    setIsShowModal(true);
  };

  const handleDelete = (record) => {
    Modal.confirm({
      title: "Bạn có chắc chắn?",
      content: `Bạn thực sự muốn xóa sản phẩm "${record.title}"?`,
      onOk: async () => {
        const res = await deleteProduct(record._id);
        if (res.status === 200) {
          openNotification({
            message: "Thông báo",
            description: "Xóa sản phẩm thành công",
          });
          fetchData(pagi.page, pagi.limit);
        }
      },
    });
  };

  const handleAddNew = () => {
    setIsShowModal(true);
    if (editProduct) setEditProduct(null);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      render: (id) => (
        <span className="text-xs text-gray-500 max-w-2">{id}</span>
      ),
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      render: (text) => <span className="font-bold">{text}</span>,
    },
    {
      title: "Ảnh",
      dataIndex: "img",
      key: "img",
      render: (img) => (
        <Image
          src={IMAGEURL + img}
          alt="Product"
          width={64}
          height={64}
          className="w-16 h-16 object-cover"
        />
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) => <span>{formatCurrencyVND(price)}</span>,
    },
    {
      title: "Số lượng còn lại",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity) => <span>{quantity}</span>,
    },
    {
      title: "Thể loại",
      dataIndex: "category",
      key: "category",
      render: (category) => <span>{category?.name}</span>,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      render: (desc) => (
        <span className="line-clamp-2 w-40" title={desc}>
          {desc}
        </span>
      ),
    },
    {
      title: "Sizes",
      dataIndex: "sizes",
      key: "sizes",
      render: (sizes) => (
        <span>{sizes?.map((size) => size.size).join(", ")}</span>
      ),
    },
    {
      title: "Nhãn hàng",
      dataIndex: "brand",
      key: "brand",
      render: (brand) => <span>{brand.name}</span>,
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
            onClick={() => navigator(`/manager-quantity/${record._id}`)}
            icon={<EyeOutlined />}
          >
            Nhập hàng
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

  const handleSave = async (values) => {
    try {
      let res;
      if (editProduct?._id) {
        res = await updateProduct(
          {
            ...values,
            sizes: values.sizes?.map((productSize) => {
              const updatedSize = editProduct?.sizes?.find(
                (size) => size._id === productSize._id
              );
              return updatedSize
                ? {
                    ...productSize,
                    quantity: updatedSize.quantity,
                  }
                : {
                    ...productSize,
                    quantity: 0,
                  };
            }),
          },
          editProduct._id
        );
      } else {
        res = await createProduct({
          ...values,
          sizes: values.sizes?.map((size) => ({ ...size, quantity: 0 })),
        });
      }
      if (res.status === 201) {
        openNotification({
          message: "Thông báo",
          description: "Tạo sản phẩm mới thành công",
        });
        fetchData(pagi.page, pagi.limit);
      }
      if (res.status === 200) {
        openNotification({
          message: "Thông báo",
          description: "Cập nhật sản phẩm mới thành công",
        });
        fetchData(pagi.page, pagi.limit);
      }
    } catch (error) {
      openNotification({
        type: "error",
        message: "Thông báo",
        error: error,
      });
    } finally {
      setIsShowModal(false);
    }
  };
  return (
    <div className="p-4">
      <Button
        icon={<PlusOutlined />}
        type="primary"
        onClick={handleAddNew}
        style={{ marginBottom: 20 }}
      >
        Thêm mới
      </Button>
      <Table
        dataSource={listProduct}
        columns={columns}
        loading={loading}
        rowKey="id"
        pagination={false}
      />
      <div className="flex justify-end mt-4">
        <Pagination
          current={pagi.page}
          total={pagi.total}
          pageSize={pagi.limit}
          onChange={(page) => fetchData(page, pagi.limit)}
          showSizeChanger
          onShowSizeChange={(current, size) => fetchData(current, size)}
        />
      </div>
      {isShowModal ? (
        <Modal
          title={
            editProduct ? "Chỉnh sửa thông tin sản phẩm" : "Thêm mới sản phẩm"
          }
          visible={isShowModal}
          footer={null}
          onCancel={() => setIsShowModal(false)}
        >
          <ProductForm
            initialValues={editProduct ? editProduct : null}
            onSave={handleSave}
            onCancel={() => setIsShowModal(false)}
          />
        </Modal>
      ) : null}
    </div>
  );
};

export default ManagerProduct;
