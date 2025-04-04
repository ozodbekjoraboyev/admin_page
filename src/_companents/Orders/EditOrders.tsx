import { Button, Drawer, Form, Input, message, Radio } from "antd";
import api from "../../api/api";
import { OrdersType } from "../../Type";
import { useState } from "react";

function EditOrders({
  editOrders,
  seteditOrders,
}: {
  editOrders: OrdersType;
  seteditOrders: any;
}) {
  const [loading, setloading] = useState(false);

  return (
    <div>
      <Drawer>
        <Form
          layout="vertical"
          initialValues={editOrders}
          onFinish={(values) => {
            console.log("Yangi foydalanuvchi:", values);
            setloading(true);

            api
              .patch(`/api/orders`, {
                title: values.title,
                isActive: values.isActive,
                imageUrl: values.imageUrl,
              })
              .then((res) => {
                console.log("Serverdan javob:", res.data);
                seteditOrders(false);
                message.success("Qo'shish amalga oshirildi 😊");
              })
              .catch((err) => {
                console.error("Xatolik yuz berdi😒", err.message);
                message.error("Qo'shish amalga oshirilmadi  😒  " + err);
              })
              .finally(() => setloading(false));
          }}
        >
          <Form.Item name="title" label="title" rules={[{ required: true }]}>
            <Input placeholder="Foydalanuvchi ismi" />
          </Form.Item>
          <Form.Item
            name="imageUrl"
            label="imageUrl"
            rules={[{ required: true }]}
          >
            <Input placeholder="Emailni kiriting" />
          </Form.Item>

          <Form.Item
            name="isActive"
            label="isActive"
            rules={[{ required: true }]}
          >
            <Radio.Group
              options={[
                { label: "Ha", value: true },
                { label: "Yo‘q", value: false },
              ]}
              optionType="button"
              buttonStyle="solid"
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
    </div>
  );
}

export default EditOrders;
