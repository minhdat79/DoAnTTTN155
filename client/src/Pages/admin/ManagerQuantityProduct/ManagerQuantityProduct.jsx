import React, { useEffect, useState } from "react";
import { Table, Button, Popconfirm, Modal } from "antd";
import useNotification from "../../../hooks/NotiHook";
import {
  admiEditBrand,
  createBrand,
  deleteBrand,
  getAllBrand,
} from "../../../service/brandService";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { formatCurrencyVND, formatDateTime } from "../../../utils";
import BrandForm from "../../../Components/FormManage/BrandForm";
import {
  createProductQuantity,
  getProductQuantity,
  updateProductQuantity,
} from "../../../service/productService";
import { useNavigate, useParams } from "react-router-dom";
import ProductQuantityForm from "../../../Components/FormManage/ProductQuantityForm";
import { MdArrowBack } from "react-icons/md";

const ManagerQuantityProduct = () => {
  const { productId } = useParams();
  const navigator = useNavigate();
  const openNotification = useNotification();
  const [listProductQuantity, setListProductQuantity] = useState([]);
  const [isShowModal, setIsShowModal] = useState(false);
  const [editProductQuanyity, setProductQuantity] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getProductQuantity(productId);
      if (res.status === 200) {
        setListProductQuantity(res.data);
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

  const handleAddNew = () => {
    setIsShowModal(true);
    if (editProductQuanyity) setProductQuantity(null);
  };

  const columns = [
    {
      title: "Mã nhập",
      dataIndex: "_id",
      key: "_id",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      render: (text) => <span>{text?.size}</span>,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      key: "note",
      render: (text) => <span>{text || "không có ghi chú"}</span>,
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);
  const handleSave = async (values) => {
    try {
      let res;

      res = await createProductQuantity(productId, values);
      if (res.status === 201) {
        setIsShowModal(false);
        openNotification({
          type: "success",
          message: "Thông báo",
          description: `Nhập số lượng thành công`,
        });
        fetchData();
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
        QUản lí số lượng sản phẩm
      </span>
      <div className="flex items-center gap-2">
        <Button
          icon={<MdArrowBack />}
          onClick={() => navigator(-1)}
          style={{ marginBottom: 20 }}
        >
          Trở về
        </Button>
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={handleAddNew}
          style={{ marginBottom: 20 }}
        >
          Thêm mới số lượng
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={listProductQuantity}
        loading={loading}
        rowKey="_id"
      />
      <Modal
        title={"Thêm mới nhãn hàng"}
        visible={isShowModal}
        footer={null}
        onCancel={() => setIsShowModal(false)}
      >
        <ProductQuantityForm
          onSave={handleSave}
          onCancel={() => setIsShowModal(false)}
          productId={productId}
        />
      </Modal>
    </div>
  );
};

export default ManagerQuantityProduct;
