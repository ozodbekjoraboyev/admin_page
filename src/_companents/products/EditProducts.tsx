import { Button, Drawer, Form, Input, message, Select } from "antd";
import { useEffect, useState } from "react";
import { CatigoriesType } from "../../Type";
import api from "../../api/api";

function EditProducts({ editProduct, setEditProduct }: any) {
  const [loading, setloading] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl p-2">Users</h1>
        <Button type="primary" onClick={() => setEditProduct(true)}>
          + Add user
        </Button>
      </div>
      <Drawer
        title="Edit"
        width={500}
        onClose={() => setEditProduct(false)}
        open={editProduct}
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
                imageUrl: values.imageUrl,
                categoryId: Number(values.categoryId),
              })
              .then(() => {
                setEditProduct(false);


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
            label="Description"
            rules={[{ required: true }]}
          >
            <Input />
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
            <Input placeholder="Mahsulot rasmi URL manzilini kiriting" />
          </Form.Item>
          {/* <Form.Item
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
          </Form.Item> */}
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

export default EditProducts;
