import { LockOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Select } from "antd";
import React, { useEffect, useState } from "react";
import UploadImage from "../UploadImage/UploadImage";
import { getAllBrand } from "../../service/brandService";
import { getAllCategory } from "../../service/categoryService";

const ProductForm = ({ initialValues, onSave, onCancel }) => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState("");
  const [listBrand, setListBrand] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  useEffect(() => {
    form.resetFields();
    if (initialValues) {
      const formattedSizes =
        initialValues.sizes?.map((item) => ({
          size: item.size,
          originPrice: item.originPrice,
          _id: item._id,
        })) || [];
      form.setFieldsValue({
        title: initialValues?.title,
        price: initialValues.price,
        productType: initialValues.productType,
        description: initialValues.description,
        img: initialValues.img,
        brand: initialValues.brand._id,
        category: initialValues.category?._id || null,
        sizes: formattedSizes,
      });
      setImageUrl(initialValues.img);
    }
  }, [initialValues]);

  const handleFinish = (values) => {
    onSave({ ...values, img: imageUrl });
  };
  const handleUploadSuccess = (url) => {
    setImageUrl(url);
    message.success("Image uploaded successfully!");
  };
  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllBrand({ limit: 1000, page: 1 });
      if (res.status === 200) {
        setListBrand(res.data.data);
      }
    };
    const fetchDataCategory = async () => {
      const res = await getAllCategory({ limit: 1000, page: 1 });
      if (res.status === 200) {
        setListCategory(res.data.data);
      }
    };
    fetchData();
    fetchDataCategory();
  }, []);
  return (
    <Form form={form} onFinish={handleFinish} layout="vertical">
      <Form.Item
        name="title"
        label="Tên sản phẩm"
        rules={[
          {
            required: true,
            message: "Please input the product title!",
          },
        ]}
      >
        <Input placeholder="Nhập tên sản phẩm" />
      </Form.Item>
      <Form.Item
        name="price"
        label="Giá bán"
        rules={[
          {
            required: true,
            message: "Please input the price!",
          },
        ]}
      >
        <Input placeholder="Nhập giá bán" />
      </Form.Item>
      <Form.Item
        name="description"
        label="mô tả sản phẩm"
        rules={[
          {
            required: true,
            message: "Please input the description!",
          },
        ]}
      >
        <Input placeholder="Nhập mô tả sản phẩm" />
      </Form.Item>
      <Form.Item
        name="brand"
        label="thương hiệu"
        rules={[
          {
            required: true,
            message: "Please select the brand!",
          },
        ]}
      >
        <Select>
          {listBrand?.map((brand) => (
            <Option key={brand._id} value={brand._id}>
              {brand?.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="category"
        label="Thể loại"
        rules={[
          {
            required: true,
            message: "Please select the brand!",
          },
        ]}
      >
        <Select>
          {listCategory?.map((category) => (
            <Option key={category._id} value={category._id}>
              {category?.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.List name="sizes">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                }}
              >
                <Form.Item
                  {...field}
                  name={[field.name, "size"]}
                  fieldKey={[field.fieldKey, "size"]}
                  label="Size"
                  rules={[
                    {
                      required: true,
                      message: "Please input the size!",
                    },
                  ]}
                  style={{
                    flex: 1,
                    marginRight: "8px",
                  }}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  {...field}
                  name={[field.name, "originPrice"]}
                  fieldKey={[field.fieldKey, "originPrice"]}
                  label="Giá nhập"
                  rules={[
                    {
                      required: true,
                      message: "Please input the originPrice!",
                    },
                  ]}
                  style={{
                    flex: 1,
                    marginRight: "8px",
                  }}
                >
                  <Input type="Number" />
                </Form.Item>
                <div>
                  <h1 className="mb-2 ml-2">Xóa</h1>
                  <Button
                    type="dashed"
                    danger
                    onClick={() => remove(field.name)}
                    style={{
                      marginBottom: "24px",
                    }}
                  >
                    Xóa
                  </Button>
                </div>
              </div>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block>
                Thêm size mới
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <UploadImage
        onUpdate={handleUploadSuccess}
        initUrl={initialValues ? initialValues?.img : ""}
      />

      <Form.Item className="mt-6">
        <Button type="primary" htmlType="submit">
          Save
        </Button>
        <Button onClick={onCancel} style={{ marginLeft: "8px" }}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProductForm;
