import { UserOutlined } from "@ant-design/icons";
import { Divider, Form, Input, Space, Typography } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BtnLoading from "../../../Components/BtnLoading/BtnLoading";
import useNotification from "../../../hooks/NotiHook";
import { forgotPasswordApi } from "../../../service/authService";
const { Title, Text } = Typography;

const ForgotPassword = () => {
  const navigator = useNavigate();
  const openNotification = useNotification();
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    setLoading(true);
    try {
      let response = await forgotPasswordApi(values);
      if (response.status === 200) {
        openNotification({
          message: "Thông báo",
          description: "Vui lòng kiểm tra email ",
        });
        navigator("/login");
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

  const onFinishFailed = () => {
    openNotification({
      type: "info",
      message: "Thông báo",
      description: "Vui lòng nhập đầy đủ thông tin",
    });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <Title level={2} className="text-center text-blue-500 pb-6">
          Quên mật khẩu
        </Title>
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
          <Form.Item>
            <BtnLoading
              loading={loading}
              className="w-full bg-blue-500 hover:bg-blue-600 py-5 mt-4"
              htmlType="submit"
            >
              Xác nhận
            </BtnLoading>
          </Form.Item>
        </Form>
        <Divider>Hoặc</Divider>
        <Space className="justify-center items-center w-full">
          <Text className="text-center block">
            Bạn đã có tài khoản ?
            <span
              onClick={() => navigator("/register")}
              className="text-blue-500 cursor-pointer underline ml-2"
            >
              Đăng nhập ngay
            </span>
          </Text>
        </Space>
      </div>
    </div>
  );
};

export default ForgotPassword;
