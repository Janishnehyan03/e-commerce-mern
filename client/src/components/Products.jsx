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
import { UserAuthContext } from "../context/UserAuth";
import axios from "axios";

function Products({ cartOpen, setCartOpen }) {
  const [products, setProducts] = useContext(ProductContext);
  const [loading, setLoading] = useState(false);
  const { cartDetails, getCart, addToCart } = useContext(CartDetailsContext);
  const { authData } = useContext(UserAuthContext);
  const user = authData;
  const [images, setImages] = useState([]);

  let getImageData = async () => {
    setLoading(true);
    let data = await axios.get("https://fakestoreapi.com/products");
    setImages(data.data);
    setLoading(false);
  };

  const getProducts = async () => {
    setLoading(true);
    try {
      let res = await Axios.get("/products");
      setProducts(res.data.products);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const goToCart = () => {
    setCartOpen(!cartOpen);
  };

  useEffect(() => {
    getProducts();
    getImageData();
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
            <div className="grid gap-6 md:grid-cols-4">
              {/* item */}
              {products.map((item, index) => (
                <div
                  key={index}
                  className="bg-white shadow rounded overflow-hidden group cursor-pointer"
                >
                  <div className="relative">
                    {images ? (
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-60 object-cover"
                      />
                    ) : (
                      <h1>loading</h1>
                    )}
                    <Link to={`/view/${item._id}`}>
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition"></div>
                    </Link>
                  </div>
                  <div className="pt-4 pb-3 px-4">
                    <a href="#">
                      <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
                        {item.title.substring(0, 20)}
                        {item.title.length > 20 ? "..." : ""}
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
                  <div className="flex px-4 py-2 justify-center my-8 ">
                    {item.stock <= 0 ? (
                      <p className="text-red-500">Out of Stock</p>
                    ) : (
                      <>
                        {cartDetails.find(
                          (cartItem) => cartItem._id === item._id
                        ) ? (
                          <button
                            onClick={() => goToCart()}
                            className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-full"
                          >
                            Go to cart{" "}
                          </button>
                        ) : (
                          <>
                            {user && (
                              <button
                                onClick={() => addToCart(item._id, item.title)}
                                className="bg-gray-800 text-white font-bold py-2 px-4 rounded-full hover:bg-gray-600"
                              >
                                Add To Cart
                              </button>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </div>

                  {/* show out of stock and only 5 items stock if stock less than 5 */}
                  {item.stock === 0 ? (
                    <></>
                  ) : item.stock < 6 ? (
                    <p className="text-red-400 text-center">
                      only {item.stock} left
                    </p>
                  ) : (
                    <p className="text-green-400 text-center">in stock</p>
                  )}
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
