import { Button, message, Table } from "antd";
import DeletOrders from "./DeleteOrders";
import AddOrders from "./AddOrders";
import { OrdersType, ProductsType } from "../../Type";
import { useEffect, useState } from "react";
import Loading from "../../Loading";
import api from "../../api/api";
import { EditOutlined } from "@ant-design/icons";
import axios from "axios";
// import EditOrders from "./EditOrders";

function Orders() {
  const [orders, setOrders] = useState<OrdersType[]>([]);
const [ordersProduct, setOrdersProduct] = useState<ProductsType[]>()
  const fetchOrders = () => {
    api
      .get("/api/products?limit=10&page=1&order=ASC")
      .then((res) => {
        setOrders(res.data.items);
        message.success("Orders sahifasi yuklandi ");
      })
      .catch((e) => {
        console.error("Xatolik yuz berdi", e);
        message.error("Buyurtmalarni olishda xatolik");
      });
  };

  // product get

  useEffect(() => {
    axios
      .get(`/api/products?limit=10&page=1&order=ASC`)
      .then((res) => {
        console.log(res.data.items);
        setOrdersProduct(res.data)
      })
      .catch((e) => {
        message.error("Xatolik" + e);
      });
  }, []);
  // product get

  useEffect(() => {
    fetchOrders();
  }, []);

  if (!orders.length) {
    return (
      <div className="m-auto flex justify-center items-center top-0 bottom-0 left-0 right-0">
        <Loading />
      </div>
    );
  }

  function deleteOrder(id: number) {
    api
      .delete(`/api/orders/${id}`)
      .then(() => {
        setOrders((prev) => prev.filter((item) => item.id !== id));
        message.success("Buyurtma o‘chirildi 😊");
      })
      .catch((e) => {
        message.error("O‘chirishda xatolik 😒" + e);
      });
  }

  return (
    <div className="pl-36">
      <div className="flex-1">
        <AddOrders ozgarish={fetchOrders} />
      </div>
      <Table
        dataSource={orders.map((item) => ({ ...item, key: item.id }))}
        columns={[
          { title: "ID", dataIndex: "id", key: "id" },
          { title: "Status", dataIndex: "status", key: "status" },
          {
            title: "Mahsulot IDlar",
            dataIndex: "items",
            key: "items",
            render: (items) =>
              items.map((item: any) => item.productId).join(", "),
          },
          { title: "Mijoz ID", dataIndex: "customerId", key: "customerId" },
          { title: "Yaratilgan", dataIndex: "createdAt", key: "createdAt" },
          {
            title: "Amallar",
            dataIndex: "id",
            key: "actions",
            render: (id: number, record) => (
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    // setEditOrders(record);
                    console.log("Tahrirlash uchun:", record);
                  }}
                >
                  <EditOutlined />
                </Button>
                <div onClick={() => deleteOrder(id)}>
                  <DeletOrders />
                </div>
              </div>
            ),
          },
        ]}
      />
      {/* <EditOrders editOrders={editOrders} setEditOrders={setEditOrders} /> */}
    </div>
  );
}

export default Orders;
