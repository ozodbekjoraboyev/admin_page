import { Button, Drawer, Form, Input, message } from "antd";
import api from "../../api/api";
import { useState } from "react";

function AddCatigories({ ozgarish, isOpenDraver, setOpenDraver }: any) {
  const [loading, setloading] = useState(false);


  return (
    <div className="container m-auto">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl p-2">Users</h1>
        <Button type="primary" onClick={() => setOpenDraver(true)}>
          + Add user
        </Button>
      </div>

      <Drawer
        title="New User"
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
            console.log("Yangi foydalanuvchi:", values);
            setloading(true);

          api
              .post(
                `/api/categories`,
                {
                  name: values.name,
                  description: values.description,
               
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
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input placeholder="Foydalanuvchi ismi" />
          </Form.Item>
          <Form.Item name="description" label="description" rules={[{ required: true }]}>
            <Input placeholder="descriptionni kiriting" />
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

export default AddCatigories
