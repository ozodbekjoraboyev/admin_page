import { useEffect, useState } from "react";
import { OrderStatistics } from "../../types/Type";
import api from "../../api/api";
import { Table } from "antd";

function StatisticaOrders() {
  const [status, setStatus] = useState<OrderStatistics[]>();

  useEffect(() => {
    api.get(`/api/statistics/orders`).then((res) => {
      console.log(res.data);
      setStatus(res.data);
    });
  }, []);

  return (
    <div className=" pl-36">
      <Table
        dataSource={status}
        columns={[
          {
            title: "count",
            dataIndex: "count",
            key: "count",
          },
          {
            title: "Status",
            dataIndex: "status",
            key: "id",
          },
        ]}
      />
    </div>
  );
}

export default StatisticaOrders;
