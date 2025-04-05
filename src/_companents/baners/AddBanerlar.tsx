import { Button, Drawer, Form, Input, message, Radio } from "antd";
import { useState } from "react";
import api from "../../api/api";

function AddBanerlar({ ozgarish }: any) {
  const [loading, setloading] = useState(false);
  const [isOpenModal, setOpenDraver] = useState(false);


  return (
    <div className="container m-auto">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl p-2">Banners</h1>
        <Button type="primary" onClick={() => setOpenDraver(true)}>
          + Add Banners
        </Button>
      </div>

      <Drawer
        title="New Banners"
        width={500}
        onClose={() => setOpenDraver(false)}
        open={isOpenModal}
        styles={{
          body: { paddingBottom: 80 },
        }}
      >
        <Form
          layout="vertical"
          onFinish={(values) => {
            console.log("Yangi foydalanuvchi:", values);
            setloading(true);

            api
              .post(
                `/api/banners`,
                {
                  title: values.title,
                  isActive: values.isActive,
                  imageUrl: values.imageUrl,
                },
       
              )
              .then((res) => {
                console.log("Serverdan javob:", res.data);
                setOpenDraver(false);
                ozgarish?.();
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

export default AddBanerlar;
