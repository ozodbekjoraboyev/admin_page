import React from "react";
import Product from "./Product";

function Navbar() {
  console.log("navbsr rendr billdi");

  return <div>navba
    <Product />
  </div>;
}

export default React.memo(Navbar);
