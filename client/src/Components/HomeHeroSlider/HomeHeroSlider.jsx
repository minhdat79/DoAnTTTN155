// external
import React from "react";
import { Link } from "react-router-dom";
// internal
import slider_img_1 from "../../assets/img/slider/slider-1.png";
import shape_1 from "../../assets/img/slider/shape/shape-1.png";
import { ArrowRightLong, TextShape } from "../../svg/index";

// Banner Data
const bannerData = {
  pre_title: { text: "Giá từ", price: "99.000" },
  title: "Bộ sưu tập quần áo 2024-2025",
  subtitle: {
    text_1: "Ưu đãi đặc biệt ",
    percent: 35,
    text_2: "Giảm giá trong tuần này",
  },
  img: slider_img_1,
  green_bg: true,
};

// Shape Component
function Shape({ img, num }) {
  return (
    <img
      className={`absolute tp-slider-shape-${num}`}
      src={img}
      alt="slider-shape"
    />
  );
}

const HomeHeroBanner = () => {
  return (
    <section className="relative z-10 h-4/6 flex items-center bg-[#eff0ed]">
      <div className="relative">
        <Shape img={shape_1} num="1" />
      </div>
      <div className="container mx-auto">
        <div className="grid grid-cols-2 items-center">
          <div className="relative z-10 bg-[rgba(255,255,255,0.2)] p-10 rounded-lg">
            <span className="text-xl font-semibold">
              {bannerData.pre_title.text}{" "}
              <b>{bannerData.pre_title.price} VND</b>
            </span>
            <h3 className="text-4xl font-bold my-4">{bannerData.title}</h3>
            <p className="text-lg">
              {bannerData.subtitle.text_1}
              <span className="font-bold text-green-500">
                -{bannerData.subtitle.percent}%
                <TextShape />
              </span>
              {bannerData.subtitle.text_2}
            </p>
            <Link
              to="/shop"
              className="mt-6 inline-block py-3 px-6 bg-white text-black font-medium rounded shadow hover:bg-gray-100"
            >
              Mua ngay <ArrowRightLong />
            </Link>
          </div>
          <div className="text-right">
            <img
              src={bannerData.img}
              alt="slider-img"
              className="inline-block object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHeroBanner;
