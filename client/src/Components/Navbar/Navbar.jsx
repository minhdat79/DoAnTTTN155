import {
  ContactsOutlined,
  HomeOutlined,
  LogoutOutlined,
  OrderedListOutlined,
  ProductOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, Image, Input, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";
import { getAllProduct } from "../../service/productService";
import { formatCurrencyVND } from "../../utils";
import { IMAGEURL } from "../../utils/constant";
import logo from "../../assets/logo.svg";
const Navbar = () => {
  const navigator = useNavigate();
  const [user, setUser] = useState(null);
  const [resultProduct, setResultProduct] = useState([]);
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 500);
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllProduct({
        page: 1,
        limit: 10,
        searchText: searchText,
      });
      if (res.status === 200) setResultProduct(res.data.data);
    };
    if (debouncedSearchText.trim()) {
      fetchData();
    }
  }, [debouncedSearchText]);
  const handleSearch = () => {
    if (searchText.trim()) {
      navigator(`/shop?search=${encodeURIComponent(searchText.trim())}`);
      setSearchText("");
    }
  };

  const userMenu = (
    <Menu className="w-40">
      <Menu.Item onClick={() => navigator("/profile")}>
        <UserOutlined className="mr-2" />
        {user?.userName}
      </Menu.Item>

      <Menu.Item onClick={() => navigator("/history-order")}>
        <OrderedListOutlined className="mr-2" />
        Đơn hàng
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          localStorage.removeItem("user");
          setUser(null);
          navigator("/login");
        }}
      >
        <LogoutOutlined className="mr-2" />
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="bg-white h-[70px] border-b border-b-black flex items-center justify-center">
      <div className="container flex items-center justify-between gap-12">
        <span className="font-bold text-xl">Nhóm15 TTTN</span>
        <div className="flex ml-20 gap-4 items-center">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigator("/")}
          >
            <HomeOutlined className="text-xl" />
            <span className="font-semibold  text-lg">TRANG CHỦ</span>
          </div>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigator("/shop")}
          >
            <ProductOutlined className="text-xl" />
            <span className="font-semibold  text-lg">SẢN PHẨM</span>
          </div>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigator("/contact")}
          >
            <ContactsOutlined className="text-xl" />
            <span className="font-semibold  text-lg">LIÊN HỆ</span>
          </div>
        </div>

        {searchText.trim() ? (
          <div
            className="absolute inset-0 bg-transparent z-20"
            onClick={() => setSearchText("")}
          />
        ) : null}
        <div className="flex items-center flex-1 relative">
          <Input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="rounded-l-full flex-1 max-w-lg border-slate-900 border py-[6px] px-4"
            placeholder="Tìm kiếm sản phẩm..."
            onPressEnter={handleSearch}
          />
          <Button
            onClick={handleSearch}
            className="rounded-none rounded-r-full border-slate-900 border py-[17px]"
          >
            <SearchOutlined className="text-xl" />
          </Button>
          {searchText.trim() ? (
            <div className="absolute right-0 left-0 top-10 max-h-96 overflow-y-auto bg-white shadow-lg z-50  max-w-lg rounded-md">
              {resultProduct?.length ? (
                resultProduct?.map((item) => (
                  <div
                    onClick={() => {
                      setSearchText("");
                      navigator(`/product-detail/${item._id}`);
                    }}
                    className="flex items-center gap-4 py-4 cursor-pointer hover:bg-slate-100 transition-all duration-300 ease-in-out"
                  >
                    <Image
                      src={IMAGEURL + item.img}
                      width={64}
                      height={64}
                      className="object-contain"
                    />
                    <div className="flex flex-col gap-1">
                      <span>{item.title}</span>
                      <span>{formatCurrencyVND(item.price)}</span>
                    </div>
                  </div>
                ))
              ) : (
                <span className="p-6 flex justify-center items-center text-xl font-bold">
                  Không có kết quả phù hợp
                </span>
              )}
            </div>
          ) : null}
        </div>
        <div className="flex items-center gap-6">
          {user ? (
            <>
              <Button onClick={() => navigator("/cart")}>
                <ShoppingCartOutlined className="text-2xl" />
              </Button>
              <Dropdown overlay={userMenu} trigger={["click"]} className="w-40">
                <Avatar
                  size={35}
                  icon={<UserOutlined />}
                  className="cursor-pointer"
                />
              </Dropdown>
            </>
          ) : (
            <>
              <Button onClick={() => navigator("/login")}>Đăng nhập</Button>
              <Button onClick={() => navigator("/register")}>Đăng kí</Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
