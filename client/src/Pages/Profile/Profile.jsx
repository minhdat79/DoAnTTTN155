import React, { useEffect, useState } from "react";
import { Button, Input, message, Avatar } from "antd"; // Thêm Avatar từ Ant Design
import { getUserProfile, updateUserProfile } from "../../service/userService";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    userName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await getUserProfile();
      if (res.status === 200) {
        setUserData(res.data);
        setUpdatedData({
          userName: res.data.userName,
          email: res.data.email,
          phone: res.data.phone,
        });
      } else {
        message.error("Không thể lấy thông tin người dùng.");
      }
    };
    fetchData();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    const res = await updateUserProfile(updatedData);
    if (res.status === 200) {
      message.success("Cập nhật thông tin thành công!");
      setUserData(updatedData);
      setIsEditing(false);
    } else {
      message.error("Cập nhật thông tin không thành công.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!userData) {
    return <div>Đang tải dữ liệu...</div>;
  }

  const avatarText = userData.userName
    ? userData.userName.charAt(0).toUpperCase()
    : "";

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl border border-slate-300 shadow-lg my-20">
      <div className="flex items-center mb-8 space-x-6">
        <Avatar
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-xl"
          size={80}
        >
          {avatarText}
        </Avatar>
        <div>
          <h2 className="text-3xl font-semibold text-gray-900">
            {userData.userName}
          </h2>
          <p className="text-lg text-gray-600">{userData.email}</p>
        </div>
      </div>

      {/* Hiển thị thông tin và các trường chỉnh sửa */}
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tên người dùng:
          </label>
          {isEditing ? (
            <Input
              name="userName"
              value={updatedData.userName}
              onChange={handleChange}
              className="mt-2 border-gray-300 shadow-md"
            />
          ) : (
            <span className="block mt-2 text-lg text-gray-800">
              {userData.userName}
            </span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email:
          </label>
          {isEditing ? (
            <Input
              name="email"
              value={updatedData.email}
              onChange={handleChange}
              className="mt-2 border-gray-300 shadow-md"
            />
          ) : (
            <span className="block mt-2 text-lg text-gray-800">
              {userData.email}
            </span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Số điện thoại:
          </label>
          {isEditing ? (
            <Input
              name="phone"
              value={updatedData.phone}
              onChange={handleChange}
              className="mt-2 border-gray-300 shadow-md"
            />
          ) : (
            <span className="block mt-2 text-lg text-gray-800">
              {userData.phone}
            </span>
          )}
        </div>
        <div className="mt-6 flex space-x-4">
          {isEditing ? (
            <Button
              type="primary"
              onClick={handleSave}
              className="py-2 text-lg font-semibold bg-blue-600 hover:bg-blue-700 transition duration-300"
            >
              Lưu thay đổi
            </Button>
          ) : (
            <Button
              type="default"
              onClick={handleEdit}
              className="py-2 text-lg font-semibold border-gray-300 text-gray-700 hover:bg-gray-100 transition duration-300"
            >
              Cập nhật thông tin
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
