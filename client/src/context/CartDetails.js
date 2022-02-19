import { createContext, useState } from "react";
import { toast } from "react-toastify";
import Axios from "../Axios";

export const CartDetailsContext = createContext([]);

export const CartDetailsProvider = (props) => {
  const [cartDetails, setCartDetails] = useState([]);
  const getCartDetails = async () => {
    try {
      let res = await Axios.get("/carts");
      setCartDetails(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };
  const getCart = async () => {
    try {
      let res = await Axios.get("/carts");
      setCartDetails(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };
  const addToCart = async (proId, productName) => {
    try {
      let res = await Axios.post(`/carts/add-to-cart/${proId}`);
      if (res.status === 200) {
        toast.success(`${productName} added to cart`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      }
      getCart();
    } catch (error) {
      console.log(error);
    }
  };
  const value = {
    cartDetails,
    setCartDetails,
    getCartDetails,
    getCart,
    addToCart,
  };
  return (
    <CartDetailsContext.Provider value={value}>
      {props.children}
    </CartDetailsContext.Provider>
  );
};
