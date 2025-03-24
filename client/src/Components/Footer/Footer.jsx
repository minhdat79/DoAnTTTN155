import React from "react";
import logo from "../../assets/logo.svg";
import pay from "../../assets/img/footer/footer-pay.png";
import { Email, Location } from "../../svg/index";
import { Link } from "react-router-dom";
import {
  FacebookOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

const social_data = [
  {
    id: 1,
    link: "https://www.facebook.com/hamed.y.hasan0",
    icon: <FacebookOutlined />,
    title: "Facebook",
  },
  {
    id: 2,
    link: "https://twitter.com/HamedHasan75",
    icon: <TwitterOutlined />,
    title: "Twitter",
  },
  {
    id: 3,
    link: "https://linkedin.com/in/hamed-hasan/",
    icon: <LinkedinOutlined />,
    title: "LinkedIn",
  },
  {
    id: 4,
    link: "https://vimeo.com/",
    icon: <VideoCameraOutlined />,
    title: "Vimeo",
  },
];
const Footer = () => {
  return (
    <footer className="mt-10">
      <div className="bg-gray-200 pt-16 pb-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="mb-8">
              <div className="mb-6">
                <Link href="/">
                  <span className="font-bold text-xl">Nhóm15 TTTN</span>
                </Link>
                </div>
              <p className="text-gray-600">
                Đoàn Phan Trung Chiến
              </p>
              <p className="text-gray-600">
                Vũ Minh Đạt
              </p>
              <p className="text-gray-600">
                Trang Đại Gia
              </p>
              <div className="flex space-x-4 mt-4">
                {social_data.map((s) => (
                  <a
                    href={s.link}
                    key={s.id}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-500 hover:text-blue-500"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4">Tài khoản của tôi</h4>
              <ul className="text-gray-600 space-y-2">
                <li>
                  <a href="#" className="hover:text-blue-500">
                    Theo dõi đơn hàng
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500">
                    Giao hàng
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500">
                    Danh sách yêu thích
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500">
                    Tài khoản của tôi
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500">
                    Lịch sử đơn hàng
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500">
                    Trả hàng
                  </a>
                </li>
              </ul>
            </div>
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4">Thông tin</h4>
              <ul className="text-gray-600 space-y-2">
                <li>
                  <a href="#" className="hover:text-blue-500">
                    Câu chuyện của chúng tôi
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500">
                    Nghề nghiệp
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500">
                    Chính sách bảo mật
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500">
                    Điều khoản & Điều kiện
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500">
                    Tin tức mới nhất
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500">
                    Liên hệ với chúng tôi
                  </a>
                </li>
              </ul>
            </div>

            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4">Talk To Us</h4>
              <div className="mb-6">
                <span className="block text-gray-600">
                  Got Questions? Call us
                </span>
                <h4 className="text-xl font-bold">
                  <a href="tel:670-413-90-762" className="hover:text-blue-500">
                    +84337373733
                  </a>
                </h4>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="mr-4 text-gray-500">
                    <Email />
                  </span>
                  <p>
                    <a
                      href="mailto:Nhom15tttn@gmail.com"
                      className="hover:text-blue-500"
                    >
                      Nhom15tttn@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t mt-8 pt-6">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-gray-600">
            <p className="text-sm">
              © {new Date().getFullYear()} Tất cả quyền được bảo lưu | React.js
            </p>
            <div className="mt-4 md:mt-0">
              <img src={pay} alt="thanh toán" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
