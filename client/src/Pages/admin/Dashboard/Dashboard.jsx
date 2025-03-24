import React, { useEffect, useState } from "react";
import { Card, Col, Row, Select } from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  getSummaryBrand,
  getSummaryOrder,
  getSummaryProduct,
  getSummaryTotal,
  getSummaryUser,
} from "../../../service/summaryService";

const { Option } = Select;

const Dashboard = () => {
  const [totalSummary, setTotalSummary] = useState([]);
  const [SummaryBrand, setSummaryBrand] = useState([]);
  const [SummaryUser, setSummaryUser] = useState([]);
  const [SummaryOrder, setSummaryOrder] = useState([]);
  const [SummaryProduct, setSummaryProduct] = useState([]);
  const [type, setType] = useState("month");

  const fetchDataChart = async (type) => {
    const resBrand = await getSummaryBrand(type);
    const resUser = await getSummaryUser(type);
    const resOrder = await getSummaryOrder(type);
    const resProduct = await getSummaryProduct(type);

    if (resBrand.status === 200) setSummaryBrand(resBrand.data);
    if (resUser.status === 200) setSummaryUser(resUser.data);
    if (resOrder.status === 200) setSummaryOrder(resOrder.data);
    if (resProduct.status === 200) setSummaryProduct(resProduct.data);
  };
  const fetchTotalSummary = async () => {
    const resTotal = await getSummaryTotal();
    if (resTotal.status === 200) {
      setTotalSummary(resTotal.data);
    }
  };
  useEffect(() => {
    fetchDataChart(type);
    fetchTotalSummary();
  }, [type]);

  const handleTypeChange = (value) => {
    setType(value);
  };

  // Combine data into a single array
  const combinedData = SummaryBrand.map((item, index) => ({
    time: item.time,
    brand: item.count,
    user: SummaryUser[index]?.count || 0,
    order: SummaryOrder[index]?.count || 0,
    product: SummaryProduct[index]?.count || 0,
  }));

  const backgroundColors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
  ]; // Danh sách màu

  return (
    <div>
      <Row gutter={16}>
        {totalSummary?.map((item, index) => (
          <Col key={index} span={6}>
            <div
              className={`flex flex-col gap-4 border rounded-md py-6 ${
                backgroundColors[index % backgroundColors.length]
              }`}
            >
              <span className="text-center border-b font-bold text-2xl pb-4 text-white">
                {item.title}
              </span>
              <span className="text-center font-bold text-lg pb-4 text-white">
                {item.count}
              </span>
            </div>
          </Col>
        ))}
      </Row>
      <div className="mt-10 flex justify-end items-center">
        <Select
          defaultValue={type}
          style={{ width: 120 }}
          onChange={handleTypeChange}
        >
          <Option value="day">Tháng</Option>
          <Option value="month">Năm</Option>
        </Select>
      </div>
      <Row gutter={16} className="mt-2">
        <Col span={24}>
          <Card>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={combinedData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="brand"
                  stroke="#8884d8"
                  strokeWidth={2}
                  name="Brand"
                />
                <Line
                  type="monotone"
                  dataKey="user"
                  stroke="#82ca9d"
                  strokeWidth={2}
                  name="User"
                />
                <Line
                  type="monotone"
                  dataKey="order"
                  stroke="#ffc658"
                  strokeWidth={2}
                  name="Order"
                />
                <Line
                  type="monotone"
                  dataKey="product"
                  stroke="#ff7300"
                  strokeWidth={2}
                  name="Product"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
