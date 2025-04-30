// // import { useEffect, useState } from "react";
// // import { Card, Row, Col, Typography, List, Spin } from "antd";
// // import api from "../api/api";
// // import { DashboardType } from "../types/Type";

import { Button, Card, DatePicker, Form, Input } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

// // const { Text } = Typography;

// function Dashboard() {
//   // const [dashboard, setDashboard] = useState<DashboardType | null>(null);

//   // useEffect(() => {
//   //   api.get(`/api/statistics/dashboard`).then((res) => {
//   //     console.log(res.data);
//   //     setDashboard(res.data);
//   //   });
//   // }, []);

//   return (
//     <div className="container mx-auto pl-36 pt-20">
//       {/* {dashboard ? (
//         <Row gutter={[16, 16]}>
//           <Col xs={24} sm={12} md={6}>
//             <Card title="Mahsulotlar soni" bordered={false}>
//               <Text strong>{dashboard.totalProducts}</Text>
//             </Card>
//           </Col>
//           <Col xs={24} sm={12} md={6}>
//             <Card title="Foydalanuvchilar soni" bordered={false}>
//               <Text strong>{dashboard.totalUsers}</Text>
//             </Card>
//           </Col>
//           <Col xs={24} sm={12} md={6}>
//             <Card title="Buyurtmalar soni" bordered={false}>
//               <Text strong>{dashboard.totalOrders}</Text>
//             </Card>
//           </Col>
//           <Col xs={24} sm={12} md={6}>
//             <Card title="Umumiy daromad" bordered={false}>
//               <Text strong>${dashboard.totalRevenue}</Text>
//             </Card>
//           </Col>

//           <Col xs={24} md={12}>
//             <Card title="Oxirgi buyurtmalar">
//               <List
//                 dataSource={dashboard.recentOrders}
//                 renderItem={(order) => (
//                   <List.Item>
//                     <Text>
//                       {order.createdAt} - ${order.totalPrice} - {order.status}
//                     </Text>
//                   </List.Item>
//                 )}
//               />
//             </Card>
//           </Col>

//           <Col xs={24} md={12}>
//             <Card title="Eng ko‘p sotilgan mahsulotlar">
//               <List
//                 dataSource={dashboard.topProducts}
//                 renderItem={(product) => (
//                   <List.Item>
//                     <Text>
//                       {product.name} - Sotilgan: {product.totalSold}
//                     </Text>
//                   </List.Item>
//                 )}
//               />
//             </Card>
//           </Col>
//         </Row>
//       ) : (
//         <div className="flex justify-center mt-10">
//           <Spin size="large" />
//         </div>
//       )} */}
//       <div>

//       </div>
//     </div>
//   );
// }

// export default Dashboard;
// import React from "react";
import ReactApexChart from "react-apexcharts";

type DateYype = {
  count: string;
  date: string;
};

const ApexChart = () => {
  const [data, SetKun] = useState<DateYype[]>([]);
  const [antdate, SetAntdate] = useState("2025-03-30");
  const [start, Setstart] = useState("2025-04-30");
  useEffect(() => {
    axios
      .post(`https://nt.softly.uz/api/statistics/daily-order-counts`, {
        startDate: start,
        endDate: antdate,
      })
      .then((res) => {
        console.log(res.data);
        SetKun(res.data);
      })
      .catch((err) => {
        console.log("Xatolik:", err.response?.status, err.response?.data);
      });
  }, [antdate, start]);

  return (
    <div id="chart" className=" pt-12 ">
      <DatePicker
        onChange={(e) => {
          console.log(e.toISOString());
          SetAntdate(e.toISOString());
        }}
      />{" "}
      <DatePicker
        onChange={(e) => {
          console.log(e.toISOString());
          Setstart(e.toISOString());
        }}
      />
      <ReactApexChart
        options={{
          chart: {
            height: 350,
            type: "bar",
          },
          plotOptions: {
            bar: {
              borderRadius: 10,
              dataLabels: {
                position: "top",
              },
            },
          },
          dataLabels: {
            enabled: true,
            formatter: function (val) {
              return val + "ta";
            },
            offsetY: -20,
            style: {
              fontSize: "12px",
              colors: ["#304758"],
            },
          },
          xaxis: {
            categories: data?.map((item) => {
              return item.date;
            }),
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
            crosshairs: {
              fill: {
                type: "gradient",
                gradient: {
                  colorFrom: "#D8E3F0",
                  colorTo: "#BED1E6",
                  stops: [0, 100],
                  opacityFrom: 0.4,
                  opacityTo: 0.5,
                },
              },
            },
            tooltip: {
              enabled: true,
            },
          },
          yaxis: {
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
            labels: {
              show: false,
              formatter: function (val) {
                return val + "%";
              },
            },
          },
          title: {
            text: "Monthly Inflation in Argentina, 2002",
            floating: true,
            offsetY: 330,
            align: "center",
            style: {
              color: "#444",
            },
          },
        }}
        series={[
          {
            name: "Inflation",
            data: data.map((i) => {
              return Number(i.count);
            }),
          },
        ]}
        type="line"
        height={350}
      />
    </div>
  );
};

function Dashboard() {
  return (
    <div className=" container m-auto pl-32">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      <ApexChart />
      <div className=" max-w-[500px] "></div>
    </div>
  );
}

export default Dashboard;
