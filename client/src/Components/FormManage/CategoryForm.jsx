import { Button, Form, Input } from "antd";
import React, { useEffect } from "react";

const CategoryForm = ({ initialValues, onSave, onCancel }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues]);

  const handleFinish = (values) => {
    onSave(values);
  };

  return (
    <Form form={form} onFinish={handleFinish} layout="vertical">
      <Form.Item
        name="name"
        label="Tên"
        rules={[
          {
            required: true,
            message: "Please input the cateogry name!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label="Mô tả"
        rules={[
          {
            required: true,
            message: "Please input the description!",
          },
        ]}
      >
        <Input />
      </Form.Item>
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

export default CategoryForm;
