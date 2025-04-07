import { Button, Drawer, Form, InputNumber, message, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import api from "../../api/api";
import { ProductsType, UserType } from "../../types/Type";

function Addorders({ open, setOpen, orderFuntion }: any) {
  const [form] = useForm();
  const [usersState, setusersState] = useState<UserType[]>([]);
  const [productsState, setproductsState] = useState<ProductsType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get("/api/users").then((res) => {
      setusersState(res.data.items);
    });
  }, []);

  useEffect(() => {
    api.get("/api/products").then((res) => {
      setproductsState(res.data.items);
    });
  }, []);

  return (
    <div>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <Form
          layout="vertical"
          form={form}
          onFinish={(values) => {
            console.log("order values", values);
            const ordersData = {
              customerId: values.customerId,
              status: values.status,
              items: [
                {
                  productId: values.productId,
                  quantity: values.quantity,
                },
              ],
            };
            setLoading(true);
            api
              .post("/api/orders",ordersData)
              .then((_) => {
                orderFuntion();
                message.success("Qoshildi");
              })
              .catch((e) => {
                console.log(e);
                message.error("Xatolik");
              })
              .finally(() => {
                setLoading(false);
                form.resetFields()
                setOpen(false)
              });
          }}
        >
          <Form.Item
            name="customerId"
            label="Mijoz"
            rules={[{ required: true, message: "Mahsulot tanlang" }]}
          >
            <Select
              placeholder="Mijoz"
              options={usersState.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </Form.Item>
          <Form.Item
            label="Mahsulot"
            name="productId"
            rules={[{ required: true }]}
          >
            <Select
              options={productsState.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </Form.Item>
          <Form.Item
            label="quantity"
            name="quantity"
            rules={[{ required: true }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              qoshish
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
}

export default Addorders;