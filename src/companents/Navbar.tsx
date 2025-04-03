import { Route, Routes } from "react-router";
import Saitbar from "./Saitbar";
import User from "../_companents/user/User";
import Orders from "../_companents/Orders/Orders";
import Catigories from "../_companents/catigories/Catigories";
import Products from "../_companents/products/Products";
import Banners from "../_companents/baners/Banerlar";
function Navbar() {
  return (
    <div className=" container m-auto   ">
      <div className=" flex justify-between bg-gradient-to-r from-black p-2  to-blue-600 text-white  overflow-hidden">
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
        <Route path="/orders" element={<Orders />} />
        <Route path="/products" element={<Products />} />
        <Route path="/catigories" element={<Catigories />} />
      </Routes>
    </div>
  );
}

export default Navbar;
