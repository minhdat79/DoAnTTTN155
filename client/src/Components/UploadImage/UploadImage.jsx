import { UploadOutlined } from "@ant-design/icons";
import { Button, Image, message, Upload } from "antd";
import React, { useState } from "react";
import instance from "../../config/instance";
import { IMAGEURL } from "../../utils/constant";

const UploadImage = ({ onUpdate, initUrl }) => {
  const [fileList, setFileList] = useState([]);
  const [imageUrl, setImageUrl] = useState(initUrl || "");

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await instance.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 200) {
        const url = response.data[0].path;
        setImageUrl(url);
        onUpdate(url);
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Upload failed:", error);
      message.error("Upload failed. Please try again.");
    }
  };

  const beforeUpload = (file) => {
    if (fileList.length > 0) {
      message.warning("Only one file can be uploaded.");
      return false;
    }
    handleUpload(file);
    return false;
  };

  const onRemove = () => {
    setFileList([]);
    setImageUrl("");
  };

  return (
    <div className="upload-image">
      <Upload
        fileList={fileList}
        beforeUpload={beforeUpload}
        onRemove={onRemove}
        maxCount={1}
        showUploadList={true}
      >
        <Button icon={<UploadOutlined />}>Hình ảnh sản phẩm</Button>
      </Upload>
      {imageUrl && (
        <div className="mt-4">
          <p>Uploaded Image:</p>
          <Image src={IMAGEURL + imageUrl} alt="Uploaded" width={120} />
        </div>
      )}
    </div>
  );
};

export default UploadImage;
