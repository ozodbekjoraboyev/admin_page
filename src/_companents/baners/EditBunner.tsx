import { Button, Drawer, Form, Input, message, Radio } from "antd";
import { useState } from "react";
import api from "../../api/api";
import { BanersType } from "../../Type";

function EditBunner({
  editBanners,
  seteditBanners,
  fetchBanners,
}: {
  editBanners: BanersType | null;
  seteditBanners: (value: BanersType | null) => void;
  fetchBanners: () => void;
}) {
  const [loading, setloading] = useState(false);

  return (
    <Drawer
      title="Banner tahrirlash"
      width={500}
      onClose={() => seteditBanners(null)}
      open={!!editBanners}
      styles={{ body: { paddingBottom: 80 } }}
    >
      {editBanners && (
        <Form
          key={editBanners.id}
          initialValues={editBanners}
          layout="vertical"
          onFinish={(values) => {
            setloading(true);

            api
              .patch(`/api/banners/${editBanners.id}`, {
                title: values.title,
                isActive: values.isActive,
                imageUrl: values.imageUrl,
              })
              .then(() => {
                seteditBanners(null);
                fetchBanners();
                message.success("Tahrirlash amalga oshirildi 😊");
              })
              .catch((err) => {
                message.error("Tahrirlashda xatolik 😒");
                console.error(err);
              })
              .finally(() => setloading(false));
          }}
        >
          <Form.Item name="title" label="Sarlavha" rules={[{ required: true }]}>
            <Input placeholder="Banner nomi" />
          </Form.Item>

          <Form.Item name="imageUrl" label="Rasm URL" rules={[{ required: true }]}>
            <Input placeholder="https://..." />
          </Form.Item>

          <Form.Item name="isActive" label="Faollik" rules={[{ required: true }]}>
            <Radio.Group
              options={[
                { label: "Faol", value: true },
                { label: "Faol emas", value: false },
              ]}
              optionType="button"
              buttonStyle="solid"
            />
          </Form.Item>

          <Form.Item>
            <div className="flex justify-end">
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

export default EditBunner;
