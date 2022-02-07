import { createContext, useState } from "react";
import Axios from "../Axios";

export const CartDetailsContext = createContext([]);

export const CartDetailsProvider = (props) => {
  const [cartDetails, setCartDetails] = useState([]);

  const getCartDetails = async () => {
    try {
      let res = await Axios.get("/carts");
      setCartDetails(res.data.products);
    } catch (error) {
      console.log(error.response);
    }
  };
  const getCart = async () => {
    try {
      let res = await Axios.get("/carts");
      setCartDetails(res.data.products);
    } catch (error) {
      console.log(error.response);
    }
  };
  const value = {
    cartDetails,
    setCartDetails,
    getCartDetails,
    getCart,
  };
  return (
    <CartDetailsContext.Provider value={value}>
      {props.children}
    </CartDetailsContext.Provider>
  );
};
