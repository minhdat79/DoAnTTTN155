import { FilterOutlined } from "@ant-design/icons";
import { Button, Pagination, Select, message } from "antd";
import React, { useState, useEffect } from "react";
import { formatCurrencyVND } from "../../utils";
import { getAllProduct } from "../../service/productService";
import ProductItem from "../../Components/ProductItem/ProductItem";
import { getAllCategory } from "../../service/categoryService";
import { useLocation, useParams } from "react-router-dom";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pagi, setPagi] = useState({
    total: 1,
    limit: 6,
    page: 1,
    totalPages: 1,
  });
  const [filters, setFilters] = useState({
    priceRange: [0, 10000000000],
    status: [],
    category: [],
    sortBy: null,
    searchText: "",
  });
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchText = searchParams.get("search");
  const categoryText = searchParams.get("categories");
  const fetchProducts = async () => {
    try {
      const res = await getAllProduct({
        page: pagi.page,
        limit: pagi.limit,
        filters,
      });
      if (res.status === 200) {
        setProducts(res.data.data);
        setPagi(res.data.meta);
      }
    } catch (error) {
      message.error("Không thể tải danh sách sản phẩm");
    }
  };
  const fetchAllCategories = async () => {
    try {
      const res = await getAllCategory({
        page: 1,
        limit: 1000,
      });
      if (res.status === 200) {
        setCategories(res.data.data);
      }
    } catch (error) {
      message.error("Không thể tải danh sách sản phẩm");
    }
  };
  useEffect(() => {
    if (searchText) {
      setFilters((prev) => ({
        ...prev,
        searchText: searchText,
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        searchText: "",
      }));
    }
  }, [searchText]);

  useEffect(() => {
    if (categoryText && categories.length > 0) {
      const matchedCategory = categories.find((cate) =>
        new RegExp(`^${categoryText}$`, "i").test(cate.name)
      );

      if (matchedCategory) {
        setFilters((prev) => ({
          ...prev,
          category: [matchedCategory._id],
        }));
      } else {
        setFilters((prev) => ({
          ...prev,
          category: [],
        }));
      }
    }
  }, [categoryText, categories]); // Tách riêng hiệu ứng này để đảm bảo nó chạy khi categories đã có dữ liệu

  useEffect(() => {
    fetchAllCategories();
  }, []);
  useEffect(() => {
    fetchProducts();
  }, [filters, pagi.page, pagi.limit]);

  const handleMinPriceChange = (e) => {
    const minPrice = Number(e.target.value);
    setFilters((prev) => ({
      ...prev,
      priceRange: [minPrice, prev.priceRange[1]],
    }));
  };

  const handleMaxPriceChange = (e) => {
    const maxPrice = Number(e.target.value);
    setFilters((prev) => ({
      ...prev,
      priceRange: [prev.priceRange[0], maxPrice],
    }));
  };

  const handleStockChange = (stockStatus) => {
    setFilters((prev) => ({
      ...prev,
      status: prev.status.includes(stockStatus)
        ? prev.status.filter((status) => status !== stockStatus)
        : [...prev.status, stockStatus],
    }));
  };

  const handleCategoryChange = (category) => {
    setFilters((prev) => ({
      ...prev,
      category: prev?.category?.includes(category)
        ? prev?.category.filter((cat) => cat !== category)
        : [...prev.category, category],
    }));
  };

  const handleSortChange = (value) => {
    setFilters({ ...filters, sortBy: value });
  };

  const handlePageChange = (page, pageSize) => {
    setPagi((prev) => ({
      ...prev,
      page,
      limit: pageSize,
    }));
  };

  return (
    <div className="flex justify-center">
      <div className="container">
        <div className="flex gap-6 px-4 py-6">
          <div className="w-1/4">
            {searchText ? (
              <div>
                <h3 className="text-lg font-base mb-2">
                  Kết quả tìm kiếm của bạn: <strong>{searchText}</strong>
                </h3>
              </div>
            ) : null}

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">
                Lọc theo khoảng giá
              </h3>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Giá thấp nhất"
                  className="w-1/2 p-2 border border-gray-300 rounded"
                  onChange={handleMinPriceChange}
                />
                <input
                  type="number"
                  placeholder="Giá cao nhất"
                  className="w-1/2 p-2 border border-gray-300 rounded"
                  onChange={handleMaxPriceChange}
                />
              </div>
              <div className="text-sm mt-2">
                {formatCurrencyVND(filters.priceRange[0])} -{" "}
                {formatCurrencyVND(filters.priceRange[1])}
              </div>
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">
                Trạng thái sản phẩm
              </h3>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="in-stock"
                  onChange={() => handleStockChange("in-stock")}
                />
                <label htmlFor="in-stock">Còn hàng</label>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  id="out-of-stock"
                  onChange={() => handleStockChange("out-of-stock")}
                />
                <label htmlFor="out-of-stock">Hết hàng</label>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Thể loại</h3>
              <ul className="space-y-2 text-gray-600">
                {categories.map((category) => (
                  <li
                    key={category._id}
                    className="cursor-pointer hover:text-black"
                  >
                    <input
                      type="checkbox"
                      checked={filters.category.includes(category._id)}
                      onChange={() => handleCategoryChange(category._id)}
                    />
                    <label className="ml-2">{category.name}</label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="w-3/4">
            <div className="flex justify-between items-center mb-6">
              <div>Hiển thị {products.length} sản phẩm</div>
              <div className="flex items-center gap-4">
                <Select
                  className="w-48 h-10"
                  placeholder="Sắp xếp"
                  onChange={handleSortChange}
                >
                  <Select.Option value="price-asc">Giá tăng dần</Select.Option>
                  <Select.Option value="price-desc">Giá giảm dần</Select.Option>
                </Select>
              </div>
            </div>
            <>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products?.map((product) => (
                  <ProductItem key={product._id} product={product} />
                ))}
              </div>
              <div className="mt-8 flex justify-center">
                <Pagination
                  current={pagi.page}
                  pageSize={pagi.limit}
                  total={pagi.total}
                  onChange={handlePageChange}
                  showSizeChanger
                  pageSizeOptions={[6, 12, 24, 48]}
                />
              </div>
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
