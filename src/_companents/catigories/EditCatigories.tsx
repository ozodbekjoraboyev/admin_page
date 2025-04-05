import { Button, Drawer, Form, Input, message } from "antd";
import { CatigoriesType } from "../../Type";
import { useState } from "react";
import api from "../../api/api";
import TextArea from "antd/es/input/TextArea";

function EditCatigories({
  editCatigories,
  setEditCatigories,
  Users,
}: {
  editCatigories: CatigoriesType;
  setEditCatigories: any;
  Users: () => void;
}) {
  const [loading, setloading] = useState(false);

  return (
    <div>
      <Drawer
        title="lkjhgfrtyui"
        width={500}
        onClose={() => setEditCatigories(undefined)}
        open={!!editCatigories}
        styles={{
          body: { paddingBottom: 80 },
        }}
      >
        <Form
          initialValues={editCatigories}
          layout="vertical"
          onFinish={(values) => {
            console.log("Yangi foydalanuvchi:", values);
            setloading(true);

            api
              .patch(`/api/categories${editCatigories?.id}`, {
                name: values.name,
                description: values.description,
              })
              .then((res) => {
                console.log("Serverdan javob:", res.data);
                setEditCatigories(undefined);
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
          <Form.Item
            name="name"
            label="Kategoriya nomi"
            rules={[{ required: true }]}
          >
            <Input placeholder="Kategoriya nomini kiriting" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Tavsif"
            rules={[{ required: true }]}
          >
            <TextArea placeholder="Kategoriya tavsifini kiriting" />
          </Form.Item>

          <Form.Item>
            <div className="flex gap-5 justify-end">
              <Button loading={loading} htmlType="submit" type="primary">
              <Button type="primary">{loading ? "Saqlanmoqda..." : "Saqlash"}</Button>
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
}

export default EditCatigories;
