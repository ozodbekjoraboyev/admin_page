import {
  Button,
  Drawer,
  Form,
  Input,
  message,
  Radio,
  Upload,
  UploadProps,
} from "antd";
import React, { useState } from "react";
import UsersAll from "../../api/users/Users";
import { UploadOutlined } from "@ant-design/icons";

function AddUser({ ozgarish, isOpenDraver, setOpenDraver }: any) {
  const [loading, setloading] = useState(false);
  const props: UploadProps = {
    name: "file",
    action: "https://nt.softly.uz/api/files/upload",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div>
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

            UsersAll.postUser(values)
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
          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input placeholder="Emailni kiriting" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter password" />
          </Form.Item>

          <Form.Item
            name="Image"
            label="Image URL"
            rules={[{ required: true }]}
          >
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
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
    </div>
  );
}

export default React.memo(AddUser);
