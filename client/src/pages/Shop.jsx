import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Axios from "../Axios";
import { CartDetailsContext } from "../context/CartDetails";
function Shop() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const history = useHistory();
  const { addToCart, cartDetails,getCart } = useContext(CartDetailsContext);
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
  useEffect(()=>{
    user && getCart();
  },[])
  return (
    <>
      {/* breadcrumb */}
      <div className="container py-4 flex items-center  gap-3">
        <a href="/" className="text-primary text-base">
          <i className="fas fa-home"></i>
        </a>
        <span className="text-sm text-gray-400">
          <i className="fas fa-chevron-right"></i>
        </span>
        <p className="text-gray-600 font-medium">Shop</p>
      </div>
      {/* breadcrumb */}
      {/* shop */}
      <div className="container grid grid-cols-4 gap-6 pt-4 pb-16 items-start ml-40">
        {/* sidebar */}
        <div className="col-span-1 bg-white px-4 pb-6 shadow rounded overflow-hidden">
          <div className="divide-y divide-gray-200 space-y-5">
            {/* categories */}
            <div>
              <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                categories
              </h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="cat-1"
                    className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                  />
                  <label
                    htmlFor="cat-1"
                    className="text-gray-600 ml-3 cursor-pointer"
                  >
                    Bedroom
                  </label>
                  <div className="ml-auto text-gray-600 text-sm">(15)</div>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="cat-1"
                    className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                  />
                  <label
                    htmlFor="cat-1"
                    className="text-gray-600 ml-3 cursor-pointer"
                  >
                    Bedroom
                  </label>
                  <div className="ml-auto text-gray-600 text-sm">(15)</div>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="cat-1"
                    className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                  />
                  <label
                    htmlFor="cat-1"
                    className="text-gray-600 ml-3 cursor-pointer"
                  >
                    Bedroom
                  </label>
                  <div className="ml-auto text-gray-600 text-sm">(15)</div>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="cat-1"
                    className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                  />
                  <label
                    htmlFor="cat-1"
                    className="text-gray-600 ml-3 cursor-pointer"
                  >
                    Bedroom
                  </label>
                  <div className="ml-auto text-gray-600 text-sm">(15)</div>
                </div>
              </div>
            </div>
            {/* categories */}

            {/* brand filtering */}
            <div>
              <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                brands
              </h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="cat-1"
                    className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                  />
                  <label
                    htmlFor="cat-1"
                    className="text-gray-600 ml-3 cursor-pointer"
                  >
                    Samsung
                  </label>
                  <div className="ml-auto text-gray-600 text-sm">(15)</div>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="cat-1"
                    className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                  />
                  <label
                    htmlFor="cat-1"
                    className="text-gray-600 ml-3 cursor-pointer"
                  >
                    Apple
                  </label>
                  <div className="ml-auto text-gray-600 text-sm">(15)</div>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="cat-1"
                    className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                  />
                  <label
                    htmlFor="cat-1"
                    className="text-gray-600 ml-3 cursor-pointer"
                  >
                    Asus
                  </label>
                  <div className="ml-auto text-gray-600 text-sm">(15)</div>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="cat-1"
                    className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                  />
                  <label
                    htmlFor="cat-1"
                    className="text-gray-600 ml-3 cursor-pointer"
                  >
                    Vivo
                  </label>
                  <div className="ml-auto text-gray-600 text-sm">(15)</div>
                </div>
              </div>
            </div>
            {/* brand filtering */}

            {/* price filtering */}
            <div className="pt-4">
              <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                Price
              </h3>
              <div className="mt-4 flex items-center">
                <input
                  type="text"
                  className="w-full border-gray-300 focus:border-primary focus:ring-0 px-3 py-1 text-gray-600 text-sm shadow-sm rounded"
                  placeholder="min"
                />
                <span className="mx-3 text-gray-600">-</span>
                <input
                  type="text"
                  className="w-full border-gray-300 focus:border-primary focus:ring-0 px-3 py-1 text-gray-600 text-sm shadow-sm rounded"
                  placeholder="max"
                />
              </div>
            </div>

            {/* price filtering */}

            {/* {size filtering} */}
            <div className="pt-4">
              <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                Size
              </h3>
              <div className="flex items-center gap-2">
                {/* single size */}
                <div className="size-selector">
                  <input
                    type="radio"
                    name="size"
                    className="hidden"
                    id="size-xs"
                  />
                  <label
                    htmlFor="size-xs"
                    className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                  >
                    XS
                  </label>
                </div>
                {/* single size */}
                {/* single size */}
                <div className="size-selector">
                  <input
                    type="radio"
                    name="size"
                    className="hidden"
                    id="size-m"
                  />
                  <label
                    htmlFor="size-m"
                    className="text border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                  >
                    M
                  </label>
                </div>
                {/* single size */}
                {/* single size */}
                <div className="size-selector">
                  <input
                    type="radio"
                    name="size"
                    className="hidden"
                    id="size-l"
                  />
                  <label
                    htmlFor="size-l"
                    className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                  >
                    L
                  </label>
                </div>
                {/* single size */}
              </div>
            </div>

            {/* {size filtering} */}

            {/* color filtering */}
            <div className="pt-4">
              <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                colors
              </h3>
              <div className="flex items-center gap-2">
                {/* single color */}
                <div className="color-selector">
                  <input
                    type="radio"
                    name="color"
                    id="color-red"
                    className="hidden"
                  />
                  <label
                    htmlFor="color-red"
                    className="border border-gray-200 rounded-sm h-5 w-5 cursor-pointer shadow-sm block"
                    style={{ backgroundColor: "red" }}
                  ></label>
                </div>
                {/* single color */}
                <div className="color-selector">
                  <input
                    type="radio"
                    name="color"
                    id="color-blue"
                    className="hidden"
                  />
                  <label
                    htmlFor="color-blue"
                    className="border border-gray-200 rounded-sm h-5 w-5 cursor-pointer shadow-sm block"
                    style={{ backgroundColor: "blue" }}
                  ></label>
                </div>
                {/* single color */}
                <div className="color-selector">
                  <input
                    type="radio"
                    name="color"
                    id="color-black"
                    className="hidden"
                  />
                  <label
                    htmlFor="color-black"
                    className="border border-gray-200 rounded-sm h-5 w-5 cursor-pointer shadow-sm block"
                    style={{ backgroundColor: "black" }}
                  ></label>
                </div>
              </div>
            </div>

            {/* color filtering */}
          </div>
        </div>

        {/* products */}
        {/* sorting */}
        <div className="col-span-3">
          <div className="flex items-center mb-1">
            <select
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              className="w-44 text-sm text-gray-600 px-4 py-3 border-gray-300 shadow-sm rounded focus:ring-primary focus:border-primary"
            >
              <option value="">default sorting</option>
              <option value="lowtoHigh">price low-high</option>
              <option value="hightoLow">price high-low</option>
              <option value="mostOrdered">Most ordered </option>
            </select>
            <div className="flex gap-2 ml-auto  mr-56">
              <div className="border border-primary w-10 h-9 flex items-center justify-center text-white bg-primary rounded cursor-pointer">
                <i className="fas fa-th"></i>
              </div>
              <div className="border  border-primary  w-10 h-9 flex items-center justify-center text-white bg-primary rounded cursor-pointer">
                <i className="fas fa-list"></i>
              </div>
            </div>
          </div>

          {/* sorting */}

          {/* products */}
          <div className="grid grid-cols-3 gap-6 mr-56">
            {/* item */}
            {products.map((item, index) => (
              <>
                <div className="bg-white shadow rounded overflow-hidden group cursor-pointer">
                  {/* image */}
                  {/* {data.map((product) => ( */}
                  <div className="relative">
                    <img
                      src={
                        "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80"
                      }
                      alt={item.title}
                      className="w-full h-60 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
                      <a
                        href="#"
                        className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                      >
                        <i className="fas fa-search"></i>
                      </a>
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
                  {user && (
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
                        <button
                          onClick={() => addToCart(item._id, item.title)}
                          className="bg-primary text-white text-sm font-semibold px-4 py-2 hover:text-primary hover:bg-white hover:border-2 transition"
                        >
                          Add To Cart
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </>
            ))}
          </div>
        </div>
        {/* products */}
      </div>
    </>
  );
}

export default Shop;
