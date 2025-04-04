import { useEffect, useState } from "react";
import { Card, Row, Col, Typography, List, Spin } from "antd";
import api from "../api/api";
import { DashboardType } from "../Type";

const {  Text } = Typography;

function Dashboard() {
  const [dashboard, setDashboard] = useState<DashboardType | null>(null);

  useEffect(() => {
    api.get(`/api/statistics/dashboard`).then((res) => {
      console.log(res.data);
      setDashboard(res.data);
    });
  }, []);

  return (
    <div className="container mx-auto pl-36">
      {dashboard ? (
        <Row gutter={[16, 16]}>
          {/* Umumiy statistikalar */}
          <Col xs={24} sm={12} md={6}>
            <Card title="Mahsulotlar soni" bordered={false}>
              <Text strong>{dashboard.totalProducts}</Text>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card title="Foydalanuvchilar soni" bordered={false}>
              <Text strong>{dashboard.totalUsers}</Text>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card title="Buyurtmalar soni" bordered={false}>
              <Text strong>{dashboard.totalOrders}</Text>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card title="Umumiy daromad" bordered={false}>
              <Text strong>${dashboard.totalRevenue}</Text>
            </Card>
          </Col>

          {/* Oxirgi buyurtmalar */}
          <Col xs={24} md={12}>
            <Card title="Oxirgi buyurtmalar">
              <List
                dataSource={dashboard.recentOrders}
                renderItem={(order) => (
                  <List.Item>
                    <Text>{order.createdAt} - ${order.totalPrice} - {order.status}</Text>
                  </List.Item>
                )}
              />
            </Card>
          </Col>

          {/* Top mahsulotlar */}
          <Col xs={24} md={12}>
            <Card title="Eng ko‘p sotilgan mahsulotlar">
              <List
                dataSource={dashboard.topProducts}
                renderItem={(product) => (
                  <List.Item>
                    <Text>{product.name} - Sotilgan: {product.totalSold}</Text>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      ) : (
        <div className="flex justify-center mt-10">
          <Spin size="large" />
        </div>
      )}
    </div>
  );
}

export default Dashboard;