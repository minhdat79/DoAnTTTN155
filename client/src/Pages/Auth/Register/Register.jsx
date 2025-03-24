import { LockOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input, Typography } from "antd";
import React, { useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useNotification from "../../../hooks/NotiHook";
import { customerRegisterApi } from "../../../service/authService";

const { Title, Text } = Typography;

const Register = () => {
  const navigate = useNavigate();
  const openNotification = useNotification();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await customerRegisterApi(values);
      if (response.status === 201) {
        openNotification({
          type: "success",
          message: "Thông báo",
          description: "Đăng kí thành công, Vui lòng kiểm tra email",
        });
        navigate("/login");
      } else {
        openNotification({
          type: "error",
          message: "Thông báo",
          description: "Đăng kí thất bại",
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

  const onFinishFailed = (errorInfo) => {
    openNotification({
      type: "info",
      message: "Thông báo",
      description: "Vui lòng nhập đầy đủ thông tin",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl">
        <Title level={2} className="text-center text-green-500 pb-4">
          Đăng Ký
        </Title>
        <Form
          name="register"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Form.Item
            name="userName"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên đăng nhập của bạn!",
              },
              {
                min: 4,
                message: "Tên đăng nhập phải dài hơn 3 ký tự!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="mr-2" />}
              className="py-2"
              placeholder="Tên đăng nhập"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập email của bạn!",
              },
              {
                type: "email",
                message: "Email không hợp lệ!",
              },
            ]}
          >
            <Input
              prefix={<MdOutlineEmail className="mr-2" />}
              className="py-2"
              placeholder="Email của bạn"
            />
          </Form.Item>
          <Form.Item
            name="phone"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số điện thoại của bạn!",
              },
              {
                pattern: /^(03|05|07|08|09)\d{8}$/,
                message:
                  "Số điện thoại không hợp lệ! Vui lòng nhập số điện thoại hợp lệ của Việt Nam.",
              },
            ]}
          >
            <Input
              prefix={<PhoneOutlined className="mr-2" />}
              className="py-2"
              placeholder="Số điện thoại"
            />
          </Form.Item>

          <Form.Item
            name="password"
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
            <Input.Password
              prefix={<LockOutlined className="mr-2" />}
              className="py-2"
              placeholder="Mật khẩu"
            />
          </Form.Item>

          <Form.Item
            name="confirm"
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
            <Input.Password
              prefix={<LockOutlined className="mr-2" />}
              className="py-2"
              placeholder="Xác nhận mật khẩu"
            />
          </Form.Item>
          <Form.Item className="mt-8">
            <Button
              type="primary"
              htmlType="submit"
              className="w-full py-5"
              loading={loading}
              disabled={loading}
            >
              Đăng Ký
            </Button>
          </Form.Item>
        </Form>
        <Divider>Hoặc</Divider>
        <Text className="text-center block">
          Đã có tài khoản?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-500 cursor-pointer"
          >
            Đăng nhập
          </span>
        </Text>
      </div>
    </div>
  );
};

export default Register;
