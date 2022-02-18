import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import Axios from "../Axios";
import { CartDetailsContext } from "../context/CartDetails";
function Shop() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const history = useHistory();
  const { addToCart, cartDetails, getCart } = useContext(CartDetailsContext);
  const getProducts = async () => {
    const response = await Axios.get(`/products?${query}=true`);
    setProducts(response.data.products);
  };
  const goToCart = () => {
    history.push("/cart");
  };
  let user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    getProducts();
  }, [query]);
  useEffect(() => {
    user && getCart();
  }, []);

  const [show, setShow] = useState(true);
  return (
    <>
      <div>
        {show && (
          <div className="w-full h-full" id="chec-div">
            <div className="w-full h-full" id="checkout">
              <div className="flex md:flex-row flex-col justify-end" id="cart">
                <div
                  className="w-full md:pl-10 pl-4 pr-10 md:pr-4 md:py-12 py-8 bg-white overflow-y-auto overflow-x-hidden h-screen"
                  id="scroll"
                >
                  <Link
                    to="/"
                    className="flex items-center text-gray-500 hover:text-gray-600 cursor-pointer"
                    onClick={() => setShow(!show)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-chevron-left"
                      width={16}
                      height={16}
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <polyline points="15 6 9 12 15 18" />
                    </svg>
                    <p className="text-sm pl-2 leading-none">Back</p>
                  </Link>
                  <p className="text-5xl font-black leading-10 text-gray-800 pt-3">
                    Bag
                  </p>

                  <div className="md:flex items-center py-8 border-t border-b border-gray-200">
                    <div className="h-full w-1/4">
                      <img
                        src="https://cdn.tuk.dev/assets/templates/e-commerce-kit/bestSeller1.png"
                        alt
                        className="w-full h-full object-center object-cover"
                      />
                    </div>
                    <div className="md:pl-3 md:w-3/4 w-full">
                      <p className="text-xs leading-3 text-gray-800 md:pt-0 pt-4">
                        RF293
                      </p>
                      <div className="flex items-center justify-between w-full pt-1">
                        <p className="text-base font-black leading-none text-gray-800">
                          Luxe Signature Shoes
                        </p>
                      </div>
                      <p className="text-xs leading-3 text-gray-600 pt-2">
                        Height: 10 inches
                      </p>
                      <p className="text-xs leading-3 text-gray-600 py-4">
                        Color: Black
                      </p>
                      <p className="w-96 text-xs leading-3 text-gray-600">
                        Composition: 100% calf leather
                      </p>
                      <div className="flex items-center justify-between pt-5 pr-6">
                        <div className="flex itemms-center">
                          {/* add to cart button */}
                          <button className="bg-gray-800 text-white font-bold py-2 px-4 rounded-full">
                            Add to Cart
                          </button>
                        </div>
                        <p className="text-base font-black leading-none text-gray-800">
                          $9,000
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>
        {` /* width */
                #scroll::-webkit-scrollbar {
                    width: 1px;
                }

                /* Track */
                #scroll::-webkit-scrollbar-track {
                    background: #f1f1f1;
                }

                /* Handle */
                #scroll::-webkit-scrollbar-thumb {
                    background: rgb(133, 132, 132);
                }
`}
      </style>
    </>
  );
}

export default Shop;
