import { NavLink } from "react-router";

function Saitbar() {
  return (
    <div className="fixed  justify-between bg-gradient-to-r from-black  to-blue-600 text-white w-36 h-screen overflow-hidden ">
      <div className=" flex flex-col p-2 gap-3">
        {[
          {
            to: "/user",
            label: "Usees",
          },
          {
            to: "/banerlar",
            label: "Banerlar",
          },
          {
            to: "/orders",
            label: "Orders",
          },
          {
            to: "/products",
            label: "Products",
          },
          {
            to: "/catigories",
            label: "Catigories",
          },  {
            to: "/dashboard",
            label: "Dashboard",
          },
       
        ].map((item) => {
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({isActive}) =>
                `p-2 rounded text-center ${
                  isActive
                    ? "bg-white text-black font-bold"
                    : "bg-blue-700 hover:bg-blue-800"
                }`
              }
            >
              {item.label}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

export default Saitbar;
