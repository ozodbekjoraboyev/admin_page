import { Route, Routes } from "react-router";
import Saitbar from "./Saitbar";
import User from "../pages/user/User";
import Banners from "../pages/baners/Banerlar";
import OrdersPage from "../pages/Orders/Orders";
import Products from "../pages/products/Products";
import Catigories from "../pages/catigories/Catigories";
import Dashboard from "../pages/Dashboard";
import StatisticaOrders from "../pages/order/StatisticaOrders";

function Navbar() {
  return (
    <div >
      <div className=" flex  fixed z-50 w-full  justify-between bg-gradient-to-r from-black p-2  to-blue-600 text-white  overflow-hidden">
        <div>Logo</div>
        <div className=" flex items-center ">
          <img
            className=" w-10 rounded-full"
            src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
            alt=""
          />
          <div>
            <p>Ozoedbk</p>
            <p>123</p>
          </div>
        </div>
      </div>
      <Saitbar />

      <Routes>
        <Route path="/user" element={<User />} />
        <Route path="/banerlar" element={<Banners />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/catigories" element={<Catigories />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Ssatus" element={<StatisticaOrders />} />
      </Routes>
    </div>
  );
}

export default Navbar;
