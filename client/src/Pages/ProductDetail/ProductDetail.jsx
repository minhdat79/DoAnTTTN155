import { CheckCircleOutlined } from "@ant-design/icons";
import { Button, Divider, Image, InputNumber, message, Rate } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import payment_option_img from "../../assets/img/payment-option.png";
import {
  getProductByType,
  getProductDetail,
} from "../../service/productService";
import { formatCurrencyVND } from "../../utils";
import ProductItem from "../../Components/ProductItem/ProductItem";
import { IMAGEURL } from "../../utils/constant";

const ProductDetail = () => {
  const [productDetail, setProductDetail] = useState();
  const [productsRelated, setProductRelated] = useState();
  const { productId } = useParams();
  const [selectedSize, setSelectedSize] = useState();
  const [selectQuantity, setSelectQuantity] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getProductDetail(productId);
      if (res.status === 200) {
        setProductDetail(res.data);
        setSelectedSize(
          res.data?.sizes?.find((size) => size.quantity > 0)?.size
        );
      }
    };

    fetchData();
  }, [productId]);
  useEffect(() => {
    const fetchProductRelated = async () => {
      const res = await getProductByType(productDetail?.category?.name, 4);
      if (res.status === 200) {
        setProductRelated(res.data);
      }
    };
    if (productDetail) {
      fetchProductRelated();
    }
  }, [productDetail]);
  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };
  const handleAddToCart = () => {
    if (!selectedSize) {
      message.warning("Vui lòng chọn size trước khi thêm vào giỏ hàng!");
      return;
    }

    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    const productIndex = cart.findIndex(
      (item) => item._id === productDetail._id && item.size === selectedSize
    );

    if (productIndex !== -1) {
      cart[productIndex].quantity += selectQuantity;
    } else {
      cart.push({
        _id: productDetail._id,
        title: productDetail.title,
        price: productDetail.price,
        img: productDetail.img,
        size: selectedSize,
        quantity: selectQuantity,
      });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    message.success("Sản phẩm đã được thêm vào giỏ hàng!");
  };
  return productDetail ? (
    <div className="flex justify-center">
      <div className="p-4 container w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="flex justify-center items-center relative bg-[#F5F6F8] rounded-md">
            <Image
              src={
                IMAGEURL + productDetail?.img ||
                "https://via.placeholder.com/416x480?text=No+Image"
              }
              alt="product img"
              className="w-full h-auto max-h-[500px] object-contain rounded"
            />
            {productDetail?.status === "out-of-stock" && (
              <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 rounded">
                Hết hàng
              </div>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-400 uppercase">
              {productDetail?.productType}
            </h3>
            <h3 className="text-3xl font-semibold text-gray-800 mb-4">
              {productDetail?.title || "Product Title"}
            </h3>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Rate
                  disabled
                  defaultValue={productDetail?.avgReview || 5}
                  allowHalf
                />
                <span className="text-gray-600 text-sm">
                  ({productDetail?.reviews?.length || 0} Review
                  {productDetail?.reviews?.length === 1 ? "" : "s"})
                </span>
              </div>
              <span
                className={`px-4 py-1 rounded-full text-sm ${
                  productDetail?.status === "in-stock"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {productDetail?.status === "in-stock" ? "Còn hàng" : "Hết hàng"}
              </span>
            </div>

            <p className="text-gray-700 mb-6">
              {productDetail?.description || "No description available."}
            </p>

            <div className="mb-6">
              <span className="text-xl font-bold text-gray-800">
                {formatCurrencyVND(productDetail?.price) || "0.00"}
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-lg font-medium">Số lượng:</span>
                  <InputNumber
                    min={1}
                    defaultValue={1}
                    className="w-20"
                    disabled={productDetail?.status === "out-of-stock"}
                    value={selectQuantity}
                    onChange={(value) => setSelectQuantity(value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-medium">Kích cỡ:</span>
                  {productDetail?.sizes?.length
                    ? productDetail?.sizes?.map((size) => (
                        <div key={size.size} className="relative group">
                          <Button
                            className={`font-bold ${
                              selectedSize === size.size
                                ? "bg-blue-500 text-white"
                                : size.quantity === 0
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : ""
                            }`}
                            onClick={() =>
                              size.quantity > 0 && handleSizeClick(size.size)
                            }
                            disabled={size.quantity === 0}
                          >
                            {size.size}
                          </Button>

                          {size.quantity === 0 && (
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-[2px] bg-red-500 rotate-45 pointer-events-none"></div>
                          )}

                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 pointer-events-none">
                            {size.quantity === 0
                              ? "Hết hàng"
                              : `Còn lại: ${size.quantity}`}
                          </div>
                        </div>
                      ))
                    : null}
                </div>
              </div>
              <Button
                type="primary"
                block
                size="large"
                disabled={productDetail?.status === "out-of-stock"}
                className="bg-blue-500 hover:bg-blue-600"
                onClick={handleAddToCart}
              >
                Thêm vào giỏ hàng
              </Button>
              <div className="my-4">
                <div className="flex items-center gap-4">
                  <CheckCircleOutlined className="text-green-600" />
                  <span>30 ngày trả hàng dễ dàng</span>
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <CheckCircleOutlined className="text-green-600" />
                  <span>
                    Đặt hàng trước 2:30 chiều để được giao hàng trong ngày
                  </span>
                </div>
                <div className="flex bg-[#F5F6F8] mt-4 px-6 py-4 justify-between">
                  <p>
                    Đảm bảo an toàn <br /> & thanh toán bảo mật
                  </p>
                  <img src={payment_option_img} alt="payment_option_img" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Divider className="mt-8" />
        <div>
          <h4 className="text-2xl font-semibold mb-4">Đánh giá sản phẩm</h4>
          {productDetail?.reviews?.length > 0 ? (
            productDetail.reviews.map((review) => (
              <div
                key={review._id}
                className="border-b pb-4 mb-4 border-gray-200"
              >
                <div className="flex items-center gap-2">
                  <Rate disabled defaultValue={review.rating} allowHalf />
                  <span className="text-sm text-gray-600">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700 mt-2">{review.comment}</p>
              </div>
            ))
          ) : (
            <p className="italic text-slate-300 flex justify-center items-center">
              Chưa có đánh giá nào cho sản phẩm này.
            </p>
          )}
        </div>
        <div>
          <h4 className="text-2xl font-semibold mb-4">Sản phẩm liên quan</h4>
          <div className="flex justify-center items-center">
            <div className="container">
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {productsRelated?.map((product) => (
                  <ProductItem key={product._id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default ProductDetail;
