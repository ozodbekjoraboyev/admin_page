import { Button, Drawer, Form, Input, message } from "antd";
import api from "../../api/api";
import { useEffect, useState } from "react";
import { CatigoriesType } from "../../types/Type";

function AddCategories({ ozgarish, isOpenDraver, setOpenDraver }: any) {
  const [_, setCategories] = useState<CatigoriesType[]>([]);
  const [loading, setLoading] = useState(false);

  // Kategoriyalarni yuklash
  useEffect(() => {
    api
      .get("/api/categories")
      .then((res) => {
        setCategories(res.data.items);
      })
      .catch((err) => {
        console.error("Kategoriyalarni yuklashda xatolik:", err);
        message.error("Kategoriyalarni yuklashda xatolik 😒");
      });
  }, []);

  // Formni yuborish
  const handleSubmit = async (values: any) => {
    console.log("Yangi kategoriya:", values);
    setLoading(true);

    try {
      await api.post("/api/categories", {
        name: values.name,
        description: values.description,
      });

      message.success("Kategoriya muvaffaqiyatli qo‘shildi 😊");
      setOpenDraver(false);
      ozgarish();
    } catch (err: any) {
      console.error("Xatolik yuz berdi:", err.message);
      message.error(
        "Kategoriya qo‘shilmadi 😒 " +
          (err.response?.data?.message || err.message)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container m-auto">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl p-2">Kategoriyalar</h1>
        <Button type="primary" onClick={() => setOpenDraver(true)}>
          + Kategoriya qo‘shish
        </Button>
      </div>

      <Drawer
        title="Yangi kategoriya qo‘shish"
        width={500}
        onClose={() => setOpenDraver(false)}
        open={isOpenDraver}
        styles={{
          body: { paddingBottom: 80 },
        }}
      >
        <Form layout="vertical" onFinish={handleSubmit}>
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
            <Input placeholder="Kategoriya tavsifini kiriting" />
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

export default AddCategories;
