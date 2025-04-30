import "./css//App.css";
import Navbar from "./companents/Navbar";
import LoginPage from "./companents/Login";
import useMyStor from "./stor/useMyStore";

function App() {
  const { user }:any = useMyStor();

  return (
    <>
      {user ? <Navbar /> : <LoginPage />}
    </>
  );
}

export default App;

// import { Button } from "antd";
// import Navbar from "./Navbar";
// import { useState } from "react";
// import { MyConstext } from "./context";

// function App() {
//   const [count, setcount] = useState(1);
//   console.log("Ap rendr bolldi");

//   return (
//    <MyConstext.Provider value={1}>
//      <div>
//       App {count}
//       <Button
//         onClick={() => {
//           setcount(count + 1);
//         }}
//       >
//         {count}
//       </Button>
//       <Navbar />
//     </div>
//    </MyConstext.Provider>
//   );
// }

// export default App;
