import { Button, Table } from "antd";
import { useState, useEffect } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import api from "../../api/api";
import {
  Order,
  OrdersResponse,
  OrdersType,
  ProductsType,
  UserType,
} from "../../Type";
import EditOrders from "./EditOrders";
import Addorders from "./AddOrders";

function OrderStatusBadge({ status }: { status: Order["status"] }) {
  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[status]}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

function OrdersPage() {
  const [userState, setUserState] = useState<UserType[]>([]);
  const [orderState, setOrderState] = useState<Order[]>([]);
  const [productState, setProductState] = useState<ProductsType[]>([]);
  const [openOrderDrawer, setOpenDrawer] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedOrder, setSelectedOrder] = useState<Order>();

  const orders = () => {
    setLoading(true);
    api
      .get<OrdersResponse>("/api/orders?order=ASC")
      .then((res) => {
        console.log("order", res.data.items);
        setOrderState(res.data.items);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    orders();
  }, []);

  //users api
  useEffect(() => {
    api.get("/api/users").then((res) => {
      setUserState(res.data.items);
      console.log(res.data);
    });
  }, []);

  //product api

  useEffect(() => {
    api.get("/api/products").then((res) => {
      setProductState(res.data.items);
      console.log("products", res.data.items);
    });
  }, []);

  function onDelete(id: number) {
    api
      .delete(`/api/orders/${id}`)
      .then((_) =>
        setOrderState((prev) => prev.filter((item) => item.id !== id))
      );
  }
  return (
    <div className="w-full h-full bg-gray-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          </div>
          <Button type="primary" onClick={() => setOpenDrawer(true)}>
            New Order
          </Button>
        </div>
        <Table
          style={{
            overflow: "auto",
            height: 560,
            width: "100% ",
          }}
          loading={loading}
          size="large"
          columns={[
            {
              key: "id",
              dataIndex: "id",
              title: "buyurtma raqami",
            },
            {
              key: "id",
              dataIndex: "customerId",
              title: "Mijoz",
              render: (customerId: number) => {
                const new_customer = userState.find(
                  (prev) => prev.id === customerId
                );
                return new_customer?.name;
              },
            },
            {
              key: "id",
              dataIndex: "status",
              title: "status",
              render: (status: string) => (
                <OrderStatusBadge status={status as Order["status"]} />
              ),
            },
            {
              key: "id",
              dataIndex: "totalPrice",
              title: "Jami",
              render: (totalPrice) => {
                return <p>{totalPrice.toLocaleString("ru")} so'm</p>;
              },
            },
            {
              key: "id",
              dataIndex: "items",
              title: "Mahsulot",
              render: (items: any) => {
                return (
                  <div>
                    {items?.map((item: OrdersType) => {
                      const nomi = productState.find((productItem) => {
                        return productItem.id === item.id;
                      });
                      return nomi?.name;
                    })}
                  </div>
                );
              },
            },
            {
              key: "id",
              dataIndex: "id",
              title: "Actions",
              render: (id: number, nmadur: any) => {
                return (
                  <div>
                    <Button
                      onClick={() => {
                        setSelectedOrder(nmadur);
                        console.log(nmadur);
                      }}
                    >
                      <EditOutlined />
                    </Button>

                    <Button danger onClick={() => onDelete(id)}>
                      <DeleteOutlined />
                    </Button>
                  </div>
                );
              },
            },
          ]}
          dataSource={orderState}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </div>
      <Addorders
        open={openOrderDrawer}
        setOpen={setOpenDrawer}
        orderFuntion={orders}
      />
      <EditOrders
        open={selectedOrder}
        setOpen={setSelectedOrder}
        orderFuntion={orders}
      />
    </div>
  );
}

export default OrdersPage;
