import { Button, Drawer, Form, InputNumber, Select } from "antd";
import { Order } from "../../Type";
import { useState } from "react";

function EditOrders({ open, setOpen }: { open?: Order; setOpen: any }) {
  const [loading, setLoading] = useState();
  return (
    <div>
      <Drawer
        open={!!open}
        onClose={() => {
          setOpen(undefined);
        }}
      >
        <Form>
          <Form.Item rules={[{required:true}]} label=''>
            <Select />
          </Form.Item>
          <Form.Item>
            <Select />
          </Form.Item>
          <Form.Item>
            <InputNumber />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              {loading ? "Saqlanmoqda" : "Saqlash"}
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
}

export default EditOrders;
