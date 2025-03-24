import { LockOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select } from "antd";
import React, { useEffect } from "react";

const UserForm = ({ initialValues, onSave, onCancel }) => {
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
        name="userName"
        label="Tên người dùng"
        rules={[
          {
            required: true,
            message: "Please input the user name!",
          },
        ]}
      >
        <Input placeholder="Nhập tên người dùng" />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            required: true,
            message: "Please input the email!",
          },
          {
            type: "email",
            message: "The input is not a valid email address!",
          },
        ]}
      >
        <Input placeholder="Nhập email của bạn" />
      </Form.Item>
      <Form.Item
        name="phone"
        label="Số điện thoại"
        rules={[
          {
            required: true,
            message: "Please input the phone!",
          },
        ]}
      >
        <Input placeholder="Nhập số điện thoại" />
      </Form.Item>
      {initialValues ? null : (
        <>
          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu của bạn!",
              },
              {
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "Mật khẩu phải bao gồm ít nhất một chữ hoa, một chữ thường, một chữ số và một ký tự đặc biệt.",
              },
            ]}
          >
            <Input.Password placeholder="Mật khẩu" />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Xác nhận mật khẩu"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Vui lòng xác nhận mật khẩu của bạn!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Hai mật khẩu không trùng khớp!")
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Xác nhận mật khẩu" />
          </Form.Item>
        </>
      )}

      <Form.Item
        name="roles"
        label="Vai trò"
        rules={[
          {
            required: true,
            message: "Vui lòng chọn vai trò!",
          },
        ]}
      >
        <Select placeholder="Chọn vai trò" mode="multiple">
          <Select.Option value="ADMIN">ADMIN</Select.Option>
          <Select.Option value="USER">USER</Select.Option>
        </Select>
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

export default UserForm;
