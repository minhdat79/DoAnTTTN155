import { LockOutlined } from "@ant-design/icons";
import { Form, Input, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BtnLoading from "../../../Components/BtnLoading/BtnLoading";
import useNotification from "../../../hooks/NotiHook";
import { resetPasswordApi } from "../../../service/authService";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
const { Title, Text } = Typography;

const ResetPassword = () => {
  const navigator = useNavigate();
  const { token } = useParams();
  const openNotification = useNotification();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const decodeInfo = jwtDecode(token);
    Cookies.set("token", token);
    Cookies.set("userId", decodeInfo.userId);
  }, [token]);
  const onFinish = async (values) => {
    setLoading(true);
    try {
      let response = await resetPasswordApi(values, token);
      if (response.status === 200) {
        openNotification({
          message: "Thông báo",
          description: "Đặt lại mật khẩu thành công",
        });
      }
      navigator("/login");
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
          Đặt lại mật khẩu
        </Title>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
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
      </div>
    </div>
  );
};

export default ResetPassword;
