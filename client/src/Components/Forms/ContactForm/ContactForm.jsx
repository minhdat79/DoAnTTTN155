import React from "react";
import { Form, Input, Checkbox, Button, message } from "antd";
import { createNewReport } from "../../../service/reportService";

const ContactForm = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const res = await createNewReport(values);
      if (res) {
        message.success("Đã ghi nhận báo cáo");
        form.resetFields();
      }
    } catch (error) {
      message.error("Có lỗi xảy ra, vui lòng thử lại");
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{ remember: false }}
      className="max-w-lg mx-auto"
    >
      <Form.Item
        label="Tên"
        name="name"
        rules={[{ required: true, message: "Tên không được để trống" }]}
      >
        <Input placeholder="Nhập tên của bạn" />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Email không được để trống" },
          { type: "email", message: "Email không hợp lệ" },
        ]}
      >
        <Input placeholder="Nhập email của bạn" />
      </Form.Item>

      <Form.Item
        label="Số điện thoại"
        name="phone"
        rules={[
          { required: true, message: "Số điện thoại không được để trống" },
        ]}
      >
        <Input placeholder="Nhập số điện thoại của bạn" />
      </Form.Item>

      <Form.Item
        label="Chủ đề"
        name="title"
        rules={[{ required: true, message: "Chủ đề không được để trống" }]}
      >
        <Input placeholder="Nhập chủ đề" />
      </Form.Item>

      <Form.Item
        label="Nội dung"
        name="content"
        rules={[{ required: true, message: "Nội dung không được để trống" }]}
      >
        <Input.TextArea placeholder="Nhập nội dung của bạn" rows={4} />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject("Bạn cần đồng ý với điều khoản để tiếp tục."),
          },
        ]}
      >
        <Checkbox>Tôi đồng ý với các điều khoản</Checkbox>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="w-full">
          Gửi tin nhắn
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ContactForm;
