import { Drawer } from "antd";
import { Order } from "../../Type";

function EditOrders({ open, setOpen }: { open?: Order; setOpen: any }) {
  return (
    <div>
      <Drawer
        open={!!open}
        onClose={() => {
          setOpen(undefined);
        }}
      >
        wedf
      </Drawer>
    </div>
  );
}

export default EditOrders;
