import React, { useState } from "react";
import { Button, Input, message, Spin, Card } from "antd";
import {
  ReloadOutlined,
  PlayCircleOutlined,
  CheckCircleOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import {
  trainModalApi,
  gerateDataApi,
  checkModalApi,
  chatWithApi,
} from "../../../service/chatbotService";

const { TextArea } = Input;

const ManagerChatbot = () => {
  const [loading, setLoading] = useState(false);
  const [trainingStatus, setTrainingStatus] = useState("");
  const [testMessage, setTestMessage] = useState("");
  const [response, setResponse] = useState("");

  // Hàm tải lại dữ liệu
  const handleReloadData = async () => {
    setLoading(true);
    try {
      await gerateDataApi();
      message.success("Dữ liệu đã được tải lại!");
    } catch (error) {
      message.error("Lỗi khi tải lại dữ liệu!");
    } finally {
      setLoading(false);
    }
  };

  // Hàm huấn luyện chatbot
  const handleTrainChatbot = async () => {
    setLoading(true);
    try {
      await trainModalApi();
      message.success("Bắt đầu huấn luyện chatbot!");
    } catch (error) {
      message.error("Lỗi khi huấn luyện chatbot!");
    } finally {
      setLoading(false);
    }
  };

  // Hàm kiểm tra trạng thái huấn luyện
  const handleCheckStatus = async () => {
    setLoading(true);
    try {
      const res = await checkModalApi();
      setTrainingStatus(res?.data?.status);
      message.info(`Trạng thái: ${res.data?.status}`);
    } catch (error) {
      message.error("Lỗi khi kiểm tra trạng thái!");
    } finally {
      setLoading(false);
    }
  };

  // Hàm test chatbot
  const handleTestChatbot = async () => {
    if (!testMessage.trim()) {
      message.warning("Vui lòng nhập tin nhắn để test!");
      return;
    }
    setLoading(true);
    try {
      const res = await chatWithApi({ message: testMessage });
      setResponse(res.data);
    } catch (error) {
      message.error("Lỗi khi test chatbot!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Quản lý Chatbot</h2>
      <div className="grid grid-cols-2 gap-4">
        {/* Nút tải lại dữ liệu */}
        <Card>
          <Button
            type="primary"
            icon={<ReloadOutlined />}
            onClick={handleReloadData}
            loading={loading}
            block
          >
            Tải lại dữ liệu
          </Button>
        </Card>

        {/* Nút huấn luyện chatbot */}
        <Card>
          <Button
            type="primary"
            icon={<PlayCircleOutlined />}
            onClick={handleTrainChatbot}
            loading={loading}
            block
          >
            Huấn luyện Chatbot
          </Button>
        </Card>

        {/* Nút kiểm tra trạng thái */}
        <Card>
          <Button
            type="default"
            icon={<CheckCircleOutlined />}
            onClick={handleCheckStatus}
            loading={loading}
            block
          >
            Kiểm tra trạng thái
          </Button>
          {trainingStatus && (
            <p className="mt-2 text-gray-600">{trainingStatus}</p>
          )}
        </Card>

        {/* Test chatbot */}
        <Card>
          <TextArea
            rows={2}
            value={testMessage}
            onChange={(e) => setTestMessage(e.target.value)}
            placeholder="Nhập tin nhắn để test..."
          />
          <Button
            type="primary"
            className="mt-2 w-full"
            icon={<MessageOutlined />}
            onClick={handleTestChatbot}
            loading={loading}
          >
            Test Chatbot
          </Button>
          {response && (
            <p className="mt-2 bg-gray-100 p-2 rounded">{response}</p>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ManagerChatbot;
