import { Button, Form, Input, InputNumber, Select } from "antd";
import React, { useEffect, useState } from "react";
import { getProductSizes } from "../../service/productService";

const ProductQuantityForm = ({
  initialValues,
  onSave,
  onCancel,
  productId,
}) => {
  const [form] = Form.useForm();
  const [productSizes, setProductSize] = useState([]);
  useEffect(() => {
    form.resetFields();
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues]);

  const handleFinish = (values) => {
    onSave(values);
  };
  useEffect(() => {
    const fetchProductSize = async () => {
      const res = await getProductSizes(productId);
      if (res.status === 200) {
        setProductSize(res.data);
      }
    };
    fetchProductSize();
  }, []);
  return (
    <Form form={form} onFinish={handleFinish} layout="vertical">
      <Form.Item
        name="size"
        label="Size cần nhập"
        rules={[
          {
            required: true,
            message: "Please select the size!",
          },
        ]}
      >
        <Select placeholder="Size cần nhập">
          {productSizes?.map((size) => (
            <Option key={size._id} value={size._id}>
              {size?.size}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="quantity"
        label="Số lượng"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập số lượng!",
          },
          {
            type: "number",
            min: 0,
            message: "Số lượng phải là một số dương hoặc bằng 0!",
          },
        ]}
        style={{ width: "100%" }} // Đảm bảo input chiếm hết chiều ngang
      >
        <InputNumber
          placeholder="Nhập số lượng"
          min={0}
          style={{ width: "100%" }}
        />
      </Form.Item>

      {/* Ghi chú */}
      <Form.Item
        name="note"
        label="Ghi chú"
        rules={[
          {
            required: false,
            message: "Vui lòng nhập ghi chú nếu cần!",
          },
        ]}
        style={{ width: "100%" }} // Đảm bảo input chiếm hết chiều ngang
      >
        <Input placeholder="Nhập ghi chú (nếu có)" style={{ width: "100%" }} />
      </Form.Item>

      {/* Lưu và hủy */}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
        <Button onClick={onCancel} style={{ marginLeft: "8px" }}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProductQuantityForm;
