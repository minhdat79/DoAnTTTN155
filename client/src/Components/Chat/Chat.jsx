import React, { useState, useEffect, useRef } from "react";
import { Button, Input, message, Spin } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { chatWithApi } from "../../service/chatbotService";

const { TextArea } = Input;

const Chat = () => {
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, text: "Xin chào! Tôi có thể giúp gì cho bạn?", sender: "bot" },
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleChat = () => {
    setIsChatVisible(!isChatVisible);
  };

  const handleSendMessage = async () => {
    if (messageText.trim() === "") {
      message.warning("Vui lòng nhập tin nhắn!");
      return;
    }

    setLoading(true);
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: prevMessages.length + 1, text: messageText, sender: "user" },
    ]);
    setMessageText("");

    try {
      const res = await chatWithApi({ message: messageText });
      if (res.data) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { id: prevMessages.length + 1, text: res.data, sender: "bot" },
        ]);
      }
    } catch (error) {
      message.error("Đã xảy ra lỗi khi gửi tin nhắn!");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isChatVisible && (
        <div className="bg-white shadow-2xl rounded-lg w-96 h-[600px] flex flex-col relative">
          <div className="p-4 border-b border-gray-200 flex justify-between">
            <h3 className="text-lg font-semibold">Chat với Bot</h3>
            <CloseOutlined
              className="text-xl cursor-pointer hover:bg-gray-200 p-1 rounded-full"
              onClick={() => setIsChatVisible(false)}
            />
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "bot" ? "justify-start" : "justify-end"
                } mb-4`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    msg.sender === "bot"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start mb-4">
                <Spin size="small" />
              </div>
            )}
            {/* Phần tử ẩn để scroll xuống */}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 border-t border-gray-200">
            <TextArea
              rows={2}
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Nhập tin nhắn..."
            />
            <Button
              type="primary"
              className="mt-2 w-full"
              onClick={handleSendMessage}
              disabled={loading}
            >
              {loading ? <Spin size="small" /> : "Gửi"}
            </Button>
          </div>
        </div>
      )}
      <Button
        type="primary"
        shape="circle"
        size="large"
        className="shadow-lg"
        onClick={toggleChat}
        style={{ display: isChatVisible ? "none" : "block" }}
      >
        💬
      </Button>
    </div>
  );
};

export default Chat;
