import { Button, Drawer, Form, Input, message, Radio } from "antd";
import { useState } from "react";
import api from "../../api/api";
import { UserType } from "../../types/Type";

function EditUser({
  editUser,
  setEditUser,
  Users,
}: {
  editUser?: UserType;
  setEditUser: any;
  Users: () => void;
}) {
  const [loading, setloading] = useState(false);

  return (
    <>
      <Drawer
        title="Edit User "
        onClose={() => setEditUser(undefined)}
        open={editUser ? true : false}
        styles={{
          body: { paddingBottom: 80 },
        }}
      >
        <Form
          layout="vertical"
          initialValues={editUser}
          onFinish={(values) => {
            console.log("Yangi foydalanuvchi:", values);
            setloading(true);

            api
              .patch(`/api/users/${editUser?.id}`, {
                name: values.name,
                email: values.email,
                password: values.password,
                image: values.image,
                role: values.role,
              })
              .then((res) => {
                console.log("Serverdan javob:", res.data);
                setEditUser(undefined);
                Users();

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
          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input placeholder="Emailni kiriting" />
          </Form.Item>
          <Form.Item
            name="password"
            label="pasvord"
            rules={[{ required: true }]}
          >
            <Input placeholder="Foydalanuvchi ismi" />
          </Form.Item>
          <Form.Item
            name="image"
            label="Image URL"
            rules={[{ required: true }]}
          >
            <Input placeholder="Rasm URL manzilini kiriting" />
          </Form.Item>
          <Form.Item name="role" label="Role" rules={[{ required: true }]}>
            <Radio.Group
              options={[
                { label: "Customer", value: "customer" },
                { label: "Admin", value: "admin" },
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
    </>
  );
}

export default EditUser;
