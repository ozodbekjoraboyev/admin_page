import { Button, Drawer, Form, Input, message, Select } from "antd";
import { useState } from "react";
import api from "../../api/api";
import { CatigoriesType, ProductsType } from "../../Type";

function EditProducts({
  editProduct,
  setEditProduct,
  catigories,
  fetchProducts,
}: {
  editProduct?: ProductsType;
  setEditProduct: any;
  catigories: CatigoriesType[];
  fetchProducts: () => void;
}) {
  const [loading, setloading] = useState(false);

  return (
    <Drawer
      title="Mahsulotni tahrirlash"
      width={500}
      onClose={() => setEditProduct(null)}
      open={editProduct ? true : false}
      styles={{ body: { paddingBottom: 80 } }}
    >
      {editProduct && (
        <Form
          layout="vertical"
          initialValues={editProduct}
          onFinish={(values) => {
            setloading(true);
            api
              .patch(`/api/products/${editProduct.id}`, {
                name: values.name,
                stock: Number(values.stock),
                description: values.description,
                price: Number(values.price),
                imageUrl: values.imageUrl,
                categoryId: Number(values.categoryId),
              })
              .then(() => {
                setEditProduct(null);
                fetchProducts();
                message.success("Tahrirlash muvaffaqiyatli yakunlandi 😊");
              })
              .catch((err) => {
                console.error("Xatolik yuz berdi😒", err.message);
                message.error(
                  "Tahrirlash amalga oshmadi 😒 " +
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
          <Form.Item
            name="categoryId"
            label="Kategoriya"
            rules={[
              { required: true, message: "Iltimos, kategoriyani tanlang!" },
            ]}
          >
            <Select
              showSearch
              optionFilterProp="label"
              options={catigories.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
              placeholder="Kategoriya tanlang"
            />
          </Form.Item>

          <Form.Item>
            <div className="flex gap-5 justify-end">
              <Button loading={loading} htmlType="submit" type="primary">
                {loading ? "Saqlanmoqda..." : "Saqlash"}
              </Button>
            </div>
          </Form.Item>
        </Form>
      )}
    </Drawer>
  );
}

export default EditProducts;
