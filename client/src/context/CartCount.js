import { createContext, useContext, useState } from "react";
import Axios from "../Axios";

export const CartContext = createContext({});

export const CartProvider = (props) => {
  const [cartCount, setCartCount] = useState(0);
  const getCartCount = async () => {
    try {
      let res = await Axios.get("/carts/");
      if (res.status === 200) {
        setCartCount(res.data.products.length);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const value = {
    getCartCount,
    cartCount,
    setCartCount,
  };
  return (
    <CartContext.Provider value={value}>{props.children}</CartContext.Provider>
  );
};
