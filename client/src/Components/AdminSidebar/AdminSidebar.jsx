import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import {
  DashboardOutlined,
  UserOutlined,
  AppstoreAddOutlined,
  ShoppingCartOutlined,
  TagOutlined,
  LogoutOutlined,
  ContactsFilled,
} from "@ant-design/icons";
import Cookies from "js-cookie";
import { MdCategory, MdChatBubbleOutline, MdCollections } from "react-icons/md";

const { Sider } = Layout;

const AdminSidebar = () => {
  const handleLogout = () => {
    Cookies.remove("token");
    window.location.href = "/login";
  };

  return (
    <Sider className="h-screen bg-white border-r-2 border-gray-300" width={300}>
      <div className="text-center text-2xl font-bold py-6">Quản trị viên</div>
      <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}>
        <Menu.Item
          key="1"
          icon={<DashboardOutlined />}
          className="hover:bg-gray-100 py-6 text-lg"
        >
          <Link to="/dashboard">Bảng điều khiển</Link>
        </Menu.Item>
        <Menu.Item
          key="2"
          icon={<UserOutlined />}
          className="hover:bg-gray-100 py-6 text-lg"
        >
          <Link to="/manager-user">Quản lý người dùng</Link>
        </Menu.Item>
        <Menu.Item
          key="3"
          icon={<AppstoreAddOutlined />}
          className="hover:bg-gray-100 py-6 text-lg"
        >
          <Link to="/manager-product">Quản lý sản phẩm</Link>
        </Menu.Item>
        <Menu.Item
          key="4"
          icon={<ShoppingCartOutlined />}
          className="hover:bg-gray-100 py-6 text-lg"
        >
          <Link to="/manager-order">Quản lý đơn hàng</Link>
        </Menu.Item>
        <Menu.Item
          key="5"
          icon={<TagOutlined />}
          className="hover:bg-gray-100 py-6 text-lg"
        >
          <Link to="/manager-brand">Quản lý thương hiệu</Link>
        </Menu.Item>
        <Menu.Item
          key="8"
          icon={<MdCategory />}
          className="hover:bg-gray-100 py-6 text-lg"
        >
          <Link to="/manager-category">Quản lý thể loại</Link>
        </Menu.Item>
        <Menu.Item
          key="6"
          icon={<ContactsFilled />}
          className="hover:bg-gray-100 py-6 text-lg"
        >
          <Link to="/manager-contact">Quản lý Liên hệ</Link>
        </Menu.Item>
        <Menu.Item
          key="9"
          icon={<MdChatBubbleOutline />}
          className="hover:bg-gray-100 py-6 text-lg"
        >
          <Link to="/manager-chatbot">Quản lý chatbot</Link>
        </Menu.Item>
        <Menu.Item
          key="7"
          icon={<LogoutOutlined />}
          className="hover:bg-gray-100 py-6 text-lg"
        >
          <div className="border-none" onClick={handleLogout}>
            Đăng xuất
          </div>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default AdminSidebar;
