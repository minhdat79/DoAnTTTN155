import { ArrowRightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import quanImg from "../../assets/img/collecttion/quan.png";
import aoImg from "../../assets/img/collecttion/ao.png";
import { useNavigate } from "react-router-dom";

const collection = [
  {
    id: 1,
    title: "Quần",
    img: quanImg,
    bg: "#F7F1FA",
  },
  {
    id: 2,
    title: "Áo",
    img: aoImg,
    bg: "#F9F5F2",
  },
];

const ProductArea = () => {
  const navigator = useNavigate();
  return (
    <div className="flex items-center gap-4 mt-10 mx-10">
      {collection.map((item) => (
        <div
          key={item.id}
          className="p-10 rounded-md flex-1 flex justify-between items-center"
          style={{ background: item.bg }}
        >
          <div className="flex flex-col justify-center gap-4">
            <span className="text-2xl font-bold">{item.title}</span>
            <Button
              icon={<ArrowRightOutlined />}
              onClick={() =>
                navigator(`/shop?categories=${item.title.toLowerCase()}`)
              }
              className="bg-transparent border border-slate-900 w-52"
            >
              MUA NGAY!
            </Button>
          </div>
          <img src={item.img} className="w-40 h-56 object-cover" />
        </div>
      ))}
    </div>
  );
};

export default ProductArea;
