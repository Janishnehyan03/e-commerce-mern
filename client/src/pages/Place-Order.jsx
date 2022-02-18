import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Axios from "../Axios";
import { CartDetailsContext } from "../context/CartDetails";
import OrderBtn from "./OrderBtn";

function PlaceOrder() {
  const { cartDetails, getCartDetails } = useContext(CartDetailsContext);
  let user = JSON.parse(localStorage.getItem("user"));
  const [totalPrice, setTotalPrice] = useState(0);

  const [payMethod, setPayMethod] = useState(null);
  const [address, setAddress] = useState(null);
  const [formData, setFormData] = useState({
    products: [],
    amount: 0,
    address: "",
    phone: "",
    city: "",
    zip: 0,
    state: "",
    country: "",
  });
  const getMyAddress = async () => {
    try {
      let res = await Axios.post(`/users/my-address`);
      setAddress(res.data.address);
      setFormData({
        ...formData,
        products: cartDetails,
        amount: totalPrice,
        address: res.data.address.address,
        phone: res.data.address.phone,
        city: res.data.address.city,
        zip: res.data.address.zip,
        state: res.data.address.state,
        country: res.data.address.country,
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  const getTotal = async () => {
    let res = await Axios.get("/carts/total-price");
    setTotalPrice(res.data.totalPrice);
  };
  const removeFromCart = async (id, name) => {
    if (window.confirm(`Are you sure you want to remove ${name} from cart?`)) {
      try {
        let res = await Axios.patch(`/carts/remove-from-cart/${id}`);
        getCartDetails();
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    getMyAddress();
    getCartDetails();
    getTotal();
  }, []);

  return (
    <div>
      <ToastContainer />
      <div className="mt-20">
        <h1 className="flex items-center justify-center font-bold text-blue-600 text-md lg:text-3xl">
          Checkout Page
        </h1>
      </div>
      <div className="grid grid-cols-2">
        <div className="container p-12 mx-auto">
          <div className="flex flex-col w-full px-0 mx-auto md:flex-row">
            <div className="flex flex-col w-full ml-0 lg:ml-12">
              <div className="pt-12 md:pt-0 2xl:ps-4">
                <h2 className="text-xl font-bold">Order Summary</h2>
                <div className="mt-8">
                  {cartDetails.map((cartItem, index) => (
                    <div className="flex flex-col space-y-4">
                      <div className="flex space-x-4 mb-4">
                        <div>
                          <img
                            src={cartItem.product.img}
                            alt="image"
                            className="w-40"
                          />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold">
                            {cartItem.product.title}
                          </h2>
                          <p className="text-sm">
                            {cartItem.product.description}
                          </p>
                          <p className="text-sm"></p>
                          <span className="text-red-600">Price </span>
                          {cartItem.quantity} x ${cartItem.product.price}
                        </div>
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 cursor-pointer"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            onClick={() =>
                              removeFromCart(
                                cartItem.product._id,
                                cartItem.product.title
                              )
                            }
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex p-4 mt-4">
                  <h2 className="text-xl font-bold">
                    {cartDetails.length} ITEMS{" "}
                  </h2>
                </div>
                <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                  Subtotal<span className="ml-2">${totalPrice}</span>
                </div>
                <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                  Shipping Tax<span className="ml-2">$10</span>
                </div>
                <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                  Total
                  <span className="ml-2">$ {totalPrice + 10}</span>
                </div>
                <div className="mt-4">
                  {cartDetails.length > 0 ? (
                    <>
                      <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                        Payment method
                      </div>

                      <select
                        onChange={(e) => setPayMethod(e.target.value)}
                        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline my-10"
                      >
                        <option value="cod">Select</option>
                        <option value="cod">Cash on Delivery</option>
                        <option value="paypal">Paypal</option>
                      </select>
                      {payMethod && (
                        <OrderBtn
                          payMethod={payMethod}
                          cartDetails={cartDetails}
                          formData={formData}
                          getCartDetails={getCartDetails}
                          getTotal={getTotal}
                          setFormData={setFormData}
                          totalPrice={totalPrice}
                          user={user}
                        />
                      )}
                    </>
                  ) : (
                    <div className="flex items-center justify-center">
                      <p className="text-3xl text-gray-500">
                        Please add items to your cart
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container p-12 mx-auto">
          <div className="flex flex-col w-full px-0 mx-auto md:flex-row">
            <div className="flex flex-col w-full ml-0 lg:ml-12 lg:w-2/5">
              {address ? (
                <div className="pt-12 md:pt-0 2xl:ps-4">
                  <h2 className="text-xl font-bold">Your Address </h2>

                  <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                    <span className="text-gray-500">Username</span>{" "}
                    <span className="ml-2">{address.user.username}</span>
                  </div>

                  <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                    <span className="text-gray-500">Email</span>{" "}
                    <span className="ml-2">{address.email}</span>
                  </div>
                  <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                    <span className="text-gray-500">Address </span>{" "}
                    <span className="ml-2">{address.address}</span>
                  </div>
                  <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                    <span className="text-gray-500">Zip </span>{" "}
                    <span className="ml-2">{address.zip}</span>
                  </div>
                  <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                    <span className="text-gray-500">Country </span>{" "}
                    <span className="ml-2">{address.country}</span>
                  </div>
                  <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                    <span className="text-gray-500">State </span>{" "}
                    <span className="ml-2">{address.state}</span>
                  </div>
                  <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                    <span className="text-gray-500">Place </span>{" "}
                    <span className="ml-2">{address.city}</span>
                  </div>
                  <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                    <span className="text-gray-500">Phone </span>{" "}
                    <span className="ml-2">{address.phone}</span>
                  </div>

                  <div className="mt-4">
                    <button className="w-full px-6 py-2 text-white bg-blue-600 hover:bg-blue-900">
                      Edit Address
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-4">
                  <Link
                    to="/add-address"
                    className="w-full px-6 py-2 text-white bg-blue-600 hover:bg-blue-900"
                  >
                    Add New Address
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
