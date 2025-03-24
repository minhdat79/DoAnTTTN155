import { EditOutlined } from "@ant-design/icons";
import { Button, Modal, Table, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import useNotification from "../../../hooks/NotiHook";
import { getAllReport, replyReportApi } from "../../../service/reportService";
import { formatDateTime } from "../../../utils";

const ManagerContact = () => {
  const openNotification = useNotification();
  const [listReport, setListReport] = useState([]);
  const [isShowModal, setIsShowModal] = useState(false);
  const [replyReport, setReplyReport] = useState(null);
  const [pagi, setPagi] = useState({
    limit: 4,
    page: 1,
    total: 1,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const fetchData = async (page = 1, limit = 10) => {
    setLoading(true);
    try {
      const res = await getAllReport({ page, limit });
      if (res.status === 200) {
        setListReport(res.data.data);
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

  const handleReply = (record) => {
    setReplyReport(record);
    setIsShowModal(true);
    form.setFieldsValue({
      title: "",
      content: "",
    });
  };

  const handleSubmit = async (values) => {
    try {
      const res = await replyReportApi(replyReport._id, values);
      console.log("values", res);
      openNotification({ type: "success", message: "Phản hồi thành công!" });
      setIsShowModal(false);
      fetchData(pagi.page, pagi.limit); // Cập nhật lại dữ liệu
    } catch (error) {
      openNotification({
        type: "error",
        message: "Lỗi phản hồi",
        error: error,
      });
    }
  };

  const columns = [
    {
      title: "Tên khách hàng",
      dataIndex: "name",
      key: "name",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <span className="line-clamp-2 max-w-80">{text}</span>,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      render: (text) => <span className="line-clamp-2 max-w-80">{text}</span>,
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => <span>{formatDateTime(createdAt)}</span>,
    },
    {
      title: "Trả lời",
      dataIndex: "reply",
      key: "reply",
      render: (reply) => (
        <span>
          {reply?.title ? (
            <>
              <strong>Chủ đề: </strong> {reply.title} <br />
              <strong>Nội dung: </strong>
              {reply.content}
            </>
          ) : (
            "Chưa trả lời"
          )}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button
          onClick={() => handleReply(record)}
          type="primary"
          icon={<EditOutlined />}
          disabled={record?.reply?.title}
        >
          Trả lời
        </Button>
      ),
    },
  ];

  useEffect(() => {
    fetchData(pagi.page, pagi.limit);
  }, [pagi.page, pagi.limit]);

  return (
    <div>
      <h2 className="text-center text-3xl mb-4 font-bold uppercase">
        Quản lý Liên Hệ
      </h2>
      <Table
        columns={columns}
        dataSource={listReport}
        loading={loading}
        rowKey="_id"
        pagination={{
          current: pagi.page,
          pageSize: pagi.limit,
          total: pagi.total,
          onChange: (page, pageSize) =>
            setPagi({ ...pagi, page, limit: pageSize }),
        }}
      />

      <Modal
        title="Phản hồi liên hệ"
        open={isShowModal}
        onCancel={() => setIsShowModal(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsShowModal(false)}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={() => form.submit()}>
            Gửi phản hồi
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Chủ đề"
            name="title"
            rules={[{ required: true, message: "Vui lòng nhập chủ đề!" }]}
          >
            <Input placeholder="Nhập chủ đề" />
          </Form.Item>

          <Form.Item
            label="Nội dung phản hồi"
            name="content"
            rules={[
              { required: true, message: "Vui lòng nhập nội dung phản hồi!" },
            ]}
          >
            <Input.TextArea rows={4} placeholder="Nhập nội dung phản hồi" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManagerContact;
