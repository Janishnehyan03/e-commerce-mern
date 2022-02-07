import { createContext, useState } from "react";

export const ProductContext = createContext([]);

export const ProductProvider = (props) => {
  const [products, setProducts] = useState([]);
  return (
    <ProductContext.Provider value={[products, setProducts]}>
      {props.children}
    </ProductContext.Provider>
  );
};
