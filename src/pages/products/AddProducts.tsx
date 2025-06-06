import { useState, useEffect } from "react";
import { Button, Drawer, Form, Input, message, Select, Upload } from "antd";
import api from "../../api/api";
import TextArea from "antd/es/input/TextArea";
import { CatigoriesType } from "../../types/Type";
import { UploadOutlined } from "@ant-design/icons";

function AddProducts({ isOpenDraver, setOpenDraver, fetchProducts }: any) {
  const [loading, setloading] = useState(false);
  const [categories, setCategories] = useState<CatigoriesType[]>([]);

  const CatigoriId = () => {
    api
      .get("/api/categories")
      .then((res) => {
        setCategories(res.data.items);
      })
      .catch((err) => {
        console.error("Kategoriyalarni yuklashda xatolik:", err);
        message.error("Kategoriyalarni yuklashda xatolik 😒");
      });
  };

  useEffect(() => {
    CatigoriId();
  }, []);

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl p-2">Products</h1>
        <Button type="primary" onClick={() => setOpenDraver(true)}>
          + Add Products
        </Button>
      </div>
      <Drawer
        title="New Product"
        width={500}
        onClose={() => setOpenDraver(false)}
        open={isOpenDraver}
        styles={{
          body: { paddingBottom: 80 },
        }}
      >
        <Form
          layout="vertical"
          onFinish={(values) => {
            console.log("Yangi mahsulot:", values);
            setloading(true);

            api
              .post(`/api/products`, {
                name: values.name,
                stock: Number(values.stock),
                description: values.description,
                price: Number(values.price),
                imageUrl: values.imageUrl.file.response.url,
                categoryId: Number(values.categoryId),
              })
              .then(() => {
                setOpenDraver(false);

                fetchProducts();

                message.success("Qo'shish amalga oshirildi 😊");
              })
              .catch((err) => {
                console.error("Xatolik yuz berdi😒", err.message);
                message.error(
                  "Qo'shish amalga oshirilmadi 😒 " +
                    (err.response?.data?.message || err.message)
                );
              })
              .finally(() => setloading(false));
          }}
        >
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Tavsif"
            rules={[{ required: true, message: "Tavsif majburiy" }]}
          >
            <TextArea
              placeholder="Mahsulot haqida tavsif yozing"
              autoSize={{ minRows: 3, maxRows: 6 }}
              style={{
                resize: "none",
                borderRadius: "8px",
                padding: "8px 12px",
              }}
            />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="stock" label="Stock" rules={[{ required: true }]}>
            <Input type="number" placeholder="Mahsulot sonini kiriting" />
          </Form.Item>
          <Form.Item
            name="imageUrl"
            label="Image URL"
            rules={[{ required: true }]}
          >
            <Upload
              name="file"
              action={`https://nt.softly.uz/api/files/upload`}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="categoryId"
            label="Category Nomi"
            rules={[
              { required: true, message: "Iltimos, kategoriyani tanlang!" },
            ]}
          >
            <Select
              showSearch
              optionFilterProp="label"
              options={categories.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
              placeholder="Kategoriya tanlang"
            />
          </Form.Item>
          <Form.Item>
            <div className="flex gap-5 justify-end">
              <Button loading={loading} htmlType="submit" type="primary">
                {loading ? "Jo‘natilmoqda..." : "+ Qo‘shish"}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}

export default AddProducts;
