import React, { useContext } from "react";
import { useState } from "react";
import { CircularProgress } from "@material-ui/core";
import Axios from "../Axios";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link, useHistory } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ProductContext } from "../context/ProductContext";
import { CartDetailsContext } from "../context/CartDetails";

function Products() {
  const [products, setProducts] = useContext(ProductContext);
  const [loading, setLoading] = useState(false);
  const { cartDetails, getCart, addToCart } = useContext(CartDetailsContext);
  const user = JSON.parse(localStorage.getItem("user"));

  const history = useHistory();

  const getProducts = async () => {
    setLoading(true);
    try {
      let res = await Axios.get("/products");
      setProducts(res.data.products);
      setLoading(false);
    } catch (error) {
      console.log(error.response);
      setLoading(false);
    }
  };

  const goToCart = () => {
    history.push("/cart");
  };

  useEffect(() => {
    getProducts();
    user && getCart();
  }, []);
  return (
    <>
      <ToastContainer />
      <div className="container pb-16">
        <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
          Top New Arrival
        </h2>
        {loading ? (
          <>
            <div className="flex justify-center">
              <CircularProgress />
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-4 gap-6">
              {/* item */}
              {products.map((item, index) => (
                <div
                  key={index}
                  className="bg-white shadow rounded overflow-hidden group cursor-pointer"
                >
                  {/* image */}
                  {/* {data.map((product) => ( */}
                  <div className="relative">
                    <img
                      src="https://source.unsplash.com/user/erondu/1600x900"
                      alt={item.title}
                      className="w-full h-60 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
                      <Link
                        to={`/view/${item._id}`}
                        className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                      >
                        <i className="fas fa-search"></i>
                      </Link>
                      <a
                        href="#"
                        className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                      >
                        <i className="fas fa-heart"></i>
                      </a>
                    </div>
                  </div>
                  <div className="pt-4 pb-3 px-4">
                    <a href="#">
                      <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
                        {item.title}
                      </h4>
                    </a>
                    <div className="flex items-baseline mb-1 space-x-2 font-roboto">
                      <p className="text-xl text-primary font-semibold">
                        $ {item.price}
                      </p>
                      <p className="text-sm text-gray-400 line-through">
                        ${item.oldPrice}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <div className="flex gap-1 text-sm text-yellow-400">
                        <span>
                          <i className="fas fa-star"></i>
                        </span>
                        <span>
                          <i className="fas fa-star"></i>
                        </span>
                        <span>
                          <i className="fas fa-star"></i>
                        </span>
                        <span>
                          <i className="fas fa-star"></i>
                        </span>
                        <span>
                          <i className="fas fa-star"></i>
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 ml-3">(500)</div>
                    </div>
                  </div>
                  {/* if product in cart show added to cart or add to cart */}
                  <div className="flex px-4 py-2 justify-center my-8">
                    {cartDetails.find(
                      (cartItem) => cartItem._id === item._id
                    ) ? (
                      <button
                        onClick={() => goToCart()}
                        className="bg-gray-600 text-white text-sm font-semibold px-4 py-2  hover:bg-white hover:text-gray-700 hover:border-2 transition "
                      >
                        Go to cart{" "}
                      </button>
                    ) : (
                      <>
                        {user && (
                          <button
                            onClick={() => addToCart(item._id, item.title)}
                            className="bg-primary text-white text-sm font-semibold px-4 py-2 hover:text-primary hover:bg-white hover:border-2 transition "
                          >
                            Add To Cart
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Products;
