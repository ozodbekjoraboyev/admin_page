import { Button, Card, Form, Input, message } from "antd";
import { useState, useEffect } from "react";
import api from "../api/api";
import useMyStor from "../useMyStore";

function LoginPage() {
  const [loading, setloading] = useState(false);
  
  useEffect(() => {
    // Create floating elements
    const container = document.querySelector('.animation-container');
    const colors = ['#1890ff33', '#52c41a33', '#fadb1433', '#fa8c1633', '#13c2c233'];
    
    for (let i = 0; i < 20; i++) { // Increased number of elements
      const element = document.createElement('div');
      element.className = 'floating-element';
      
      // Random properties
      const size = Math.random() * 60 + 30; // Smaller sizes for elegance
      const color = colors[Math.floor(Math.random() * colors.length)];
      const duration = Math.random() * 15 + 10; // Slower animation
      const delay = Math.random() * 10;
      const left = Math.random() * 100;
      const borderRadius = Math.random() > 0.7 ? '50%' : `${Math.random() * 30 + 10}px`; // Some variation in shape
      
      element.style.width = `${size}px`;
      element.style.height = `${size}px`;
      element.style.background = color;
      element.style.animationDuration = `${duration}s`;
      element.style.animationDelay = `${delay}s`;
      element.style.left = `${left}%`;
      element.style.borderRadius = borderRadius;
      element.style.top = `-${size}px`; // Start above the viewport
      
      container?.appendChild(element);
    }
    
    return () => {
      // Clean up
      const elements = document.querySelectorAll('.floating-element');
      elements.forEach(el => el.remove());
    };
  }, []);

  return (
    <>
      <div className="animation-container fixed top-0 left-0 right-0 bottom-0 overflow-hidden z-0" />
      
      <div className="flex items-center justify-center h-screen relative z-50">
        <Card className="w-[400px] bg-white bg-opacity-90 shadow-lg">
          <Form
            layout="vertical"
            initialValues={{
              email: "admin@nt.uz",
              password: "pass123",
            }}
            onFinish={(valus) => {
              console.log(valus);

              setloading(true);
              api
                .post("/api/auth/login", valus)
                .then((res) => {
                  api.defaults.headers.Authorization = `Bearer ${res.data.accessToken}`;
                  useMyStor.setState({
                    accessToken: res.data.accessToken,
                    user: res.data.user,
                  });
                  localStorage.setItem("auth", JSON.stringify(res.data));
                  message.success("logindan muvafqyatli o'tildi ommad");
                })
                .catch((e) => {
                  console.error(e);
                  message.error("Xatolik logindan otilmadi");
                })
                .finally(() => {
                  setloading(false);
                });
            }}
          >
            <Form.Item
              label="email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "logini krit",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Parolni kirit",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button loading={loading} type="primary" block htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
      
      <style>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.5;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        
        .animation-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 0;
          pointer-events: none;
        }
        
        .floating-element {
          position: absolute;
          animation: float linear infinite;
          filter: blur(1px);
          will-change: transform;
        }
      `}</style>
    </>
  );
}

export default LoginPage;