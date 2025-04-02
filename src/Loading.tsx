"use client";

export default function Loading() {
  return (
    <div id="page" className=" m-auto container px-32 pt-32">
      <div id="container">
        <div id="ring"></div>
        <div id="ring"></div>
        <div id="ring"></div>
        <div id="ring"></div>
        <div id="h3">Loading...</div>
      </div>
    </div>
  );
}



// import { Button, Card, Form, Input, message } from "antd";
// import { useState } from "react";
// import api from "../api/api";
// import useMyStor from "../useMyStore";
// import BegraundIkon from "./BegraundIkon";
// function LoginPage() {
//   const [loading, setloading] = useState(false);
//   return (
//     <>
//       <BegraundIkon />
//       <div className="flex items-center justify-center h-screen absolute z-50 top-0 left-0 right-0  bottom-0">
//         <Card className=" w-[400px] ">
//           <Form
//             layout="vertical"
//             initialValues={{
//               email: "admin@nt.uz",
//               password: "pass123",
//             }}
//             onFinish={(valus) => {
//               console.log(valus);

//               setloading(true);
//               api
//                 .post("/api/auth/login", valus)
//                 .then((res) => {
//                   api.defaults.headers.Authorization = `Bearer ${res.data.accessToken}`;
//                   useMyStor.setState({
//                     accessToken: res.data.accessToken,
//                     user: res.data.user,
//                   });
//                   localStorage.setItem("auth", JSON.stringify(res.data));
//                   message.success("logindan muvafqyatli o'tildi ommad");
//                 })
//                 .catch((e) => {
//                   console.error(e);
//                   message.error("Xatolik logindan otilmadi");
//                 })
//                 .finally(() => {
//                   setloading(false);
//                 });
//             }}
//           >
//             <Form.Item
//               label="email"
//               name="email"
//               rules={[
//                 {
//                   required: true,
//                   message: "logini krit",
//                 },
//               ]}
//             >
//               <Input />
//             </Form.Item>

//             <Form.Item
//               label="Password"
//               name="password"
//               rules={[
//                 {
//                   required: true,
//                   message: "Parolni kirit",
//                 },
//               ]}
//             >
//               <Input.Password />
//             </Form.Item>

//             <Form.Item>
//               <Button loading={loading} type="primary" block htmlType="submit">
//                 Submit
//               </Button>
//             </Form.Item>
//           </Form>
//         </Card>
//       </div>
//     </>
//   );
// }

// export default LoginPage;
