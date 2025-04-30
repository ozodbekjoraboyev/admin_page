import { useContext } from "react";
import { MyConstext } from "./context";

function Product() {
  const valuse = useContext(MyConstext);
  return (
    <div>
      produkt
      {valuse}
    </div>
  );
}

export default Product;
