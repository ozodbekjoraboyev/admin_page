import { Button, Card, Form, Input, message } from "antd";  
import { useState, useEffect } from "react";  
import api from "../api/api";  
import useMyStor from "../useMyStore";  

function LoginPage() {  
  const [loading, setLoading] = useState(false);  

  useEffect(() => {  
    // Create floating elements  
    const container = document.querySelector('.animation-container');  
    const colors = ['#ff4d4f', '#40a9ff', '#a0d911', '#faad14', '#2f54eb'];  

    for (let i = 0; i < 20; i++) {  
      const element = document.createElement('div');  
      element.className = 'floating-element';  

      // Random properties  
      const size = Math.random() * 60 + 30;  
      const color = colors[Math.floor(Math.random() * colors.length)];  
      const duration = Math.random() * 15 + 10;  
      const delay = Math.random() * 10;  
      const left = Math.random() * 100;  
      const borderRadius = Math.random() > 0.7 ? '50%' : `${Math.random() * 30 + 10}px`;  

      element.style.width = `${size}px`;  
      element.style.height = `${size}px`;  
      element.style.background = color;  
      element.style.animationDuration = `${duration}s`;  
      element.style.animationDelay = `${delay}s`;  
      element.style.left = `${left}%`;  
      element.style.borderRadius = borderRadius;  
      element.style.top = `-${size}px`;  

      container?.appendChild(element);  
    }  

    return () => {  
      // Clean up  
      const elements = document.querySelectorAll('.floating-element');  
      elements.forEach(el => el.remove());  
    };  
  }, []);  

  const handleLogin = async (values: any) => {
    setLoading(true);
    try {
      const res = await api.post("/api/auth/login", values);
      api.defaults.headers.Authorization = `Bearer ${res.data.accessToken}`;
      useMyStor.setState({
        accessToken: res.data.accessToken,
        user: res.data.user,
      });
      localStorage.setItem("auth", JSON.stringify(res.data));
      message.success("Muvaffaqiyatli kirish!");
    } catch (e) {
      console.error(e);
      message.error("Xatolik! Kirish amalga oshmadi.");
    } finally {
      setLoading(false);
    }
  };

  return (  
    <>  
      <div className="animation-container fixed top-0 left-0 right-0 bottom-0 overflow-hidden z-0" />  

      <div className="flex items-center justify-center h-screen relative z-50">  
        <Card className="w-[400px] bg-white/80 backdrop-blur-sm shadow-lg rounded-lg p-6">  
          <h2 className="text-center text-2xl font-semibold mb-4">Kirish</h2>  
          <Form  
            layout="vertical"  
            initialValues={{  
              email: "admin@nt.uz",  
              password: "pass123",  
            }}  
            onFinish={handleLogin}  
          >  
            <Form.Item  
              label="Email"  
              name="email"  
              rules={[  
                {  
                  required: true,  
                  message: "Emailni kiriting",  
                },  
              ]}  
            >  
              <Input placeholder="Emailni kiriting" />  
            </Form.Item>  

            <Form.Item  
              label="Parol"  
              name="password"  
              rules={[  
                {  
                  required: true,  
                  message: "Parolni kiriting",  
                },  
              ]}  
            >  
              <Input.Password placeholder="Parolni kiriting" />  
            </Form.Item>  

            <Form.Item>  
              <Button loading={loading} type="primary" block htmlType="submit">  
                Kirish  
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