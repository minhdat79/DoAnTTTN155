import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Checkbox, Divider, Form, Input, Space, Typography } from "antd";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useNavigate, useResolvedPath } from "react-router-dom";
import useNotification from "../../../hooks/NotiHook";
import BtnLoading from "../../../Components/BtnLoading/BtnLoading";
import { customerLoginAPi } from "../../../service/authService";
const { Title, Text } = Typography;
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const navigator = useNavigate();
  const openNotification = useNotification();
  const [loading, setLoading] = useState(false);
  const param = useResolvedPath();
  const onFinish = async (values) => {
    setLoading(true);
    try {
      let response = await customerLoginAPi(values);
      if (response.status === 200) {
        openNotification({
          type: "success",
          message: "Thông báo",
          description: "Đăng nhập thành công",
        });
        Cookies.set("token", response.data.tokens.accessToken);
        Cookies.set("userId", response.data.user._id);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        const decode = jwtDecode(response.data.tokens.accessToken);
        if (decode?.role?.includes("ADMIN")) {
          navigator("/dashboard");
        } else navigator("/");
      } else {
        openNotification({
          type: "error",
          message: "Thông báo",
          description: "Đăng nhập thất bại",
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
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <div className="flex items-center justify-center flex-col">
          <UserOutlined className="text-5xl" />
          <Title level={2} className="text-center text-blue-500 pb-6 mt-1">
            Đăng Nhập
          </Title>
        </div>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
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
              prefix={<UserOutlined className="mr-1" />}
              className="py-2"
              placeholder="Email"
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
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1 min-w-80">
              <Checkbox />
              Nhớ mật khẩu
            </div>
            <span
              onClick={() => navigator("/forgot-password")}
              className="text-end w-full flex justify-end text-blue-500 cursor-pointer underline"
            >
              Quên mật khẩu ?
            </span>
          </div>
          <Form.Item>
            <BtnLoading
              loading={loading}
              className="w-full bg-blue-500 hover:bg-blue-600 py-5 mt-4"
              htmlType="submit"
            >
              Đăng nhập
            </BtnLoading>
          </Form.Item>
        </Form>
        <Divider>Hoặc</Divider>
        <Space className="items-center justify-center w-full">
          <Text className="text-center block">
            Chưa có tài khoản?{" "}
            <span
              onClick={() => navigator("/register")}
              className="text-blue-500 cursor-pointer underline"
            >
              Đăng ký ngay
            </span>
          </Text>
        </Space>
      </div>
    </div>
  );
};

export default Login;
