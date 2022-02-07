import React, { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Axios from "../Axios";
import { CartDetailsContext } from "../context/CartDetails";
import OrderBtn from "./OrderBtn";

function PlaceOrder() {
  const { cartDetails, setCartDetails, getCartDetails } =
    useContext(CartDetailsContext);
  let user = JSON.parse(localStorage.getItem("user"));
  const [totalPrice, setTotalPrice] = useState(0);
  const [payMethod, setPayMethod] = useState("cod");
  const [formData, setFormData] = useState({
    firstName: "Example",
    lastName: "Example",
    email: "example@gmail.com",
    address: "This is address",
    phone: "9033839383",
    amount: 0,
    postcode: "787937",
    city: "Kondotty",
    notes: "This is a note",
  });

  const getTotal = async () => {
    let res = await Axios.get("/carts/total-price");
    setTotalPrice(res.data.totalPrice);
  };
  const handleChange = (e) => {
    console.log(e.target.value);
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
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
      <div className="container p-12 mx-auto">
        <div className="flex flex-col w-full px-0 mx-auto md:flex-row">
          <div className="flex flex-col md:w-full">
            <h2 className="mb-4 font-bold md:text-xl text-heading ">
              Shipping Address
            </h2>
            <form
              className="justify-center w-full mx-auto"
              onSubmit={(e) => handleChange(e)}
            >
              <div className>
                <div className="space-x-0 lg:flex lg:space-x-4">
                  <div className="w-full lg:w-1/2">
                    <label
                      htmlFor="firstName"
                      className="block mb-3 text-sm font-semibold text-gray-500"
                    >
                      First Name
                    </label>
                    <input
                      name="firstName"
                      type="text"
                      placeholder="First Name"
                      onChange={(e) => handleChange(e)}
                      value={formData.firstName}
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                  <div className="w-full lg:w-1/2 ">
                    <label
                      htmlFor="firstName"
                      className="block mb-3 text-sm font-semibold text-gray-500"
                    >
                      Last Name
                    </label>
                    <input
                      name="lastName"
                      type="text"
                      onChange={(e) => handleChange(e)}
                      value={formData.lastName}
                      placeholder="Last Name"
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                  <div className="w-full lg:w-1/2 ">
                    <label
                      htmlFor="PhoneNumber"
                      className="block mb-3 text-sm font-semibold text-gray-500"
                    >
                      Phone Number
                    </label>
                    <input
                      name="phone"
                      type="phone"
                      onChange={(e) => handleChange(e)}
                      value={formData.phone}
                      placeholder="Phone Number"
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full">
                    <label
                      htmlFor="Email"
                      className="block mb-3 text-sm font-semibold text-gray-500"
                    >
                      Email
                    </label>
                    <input
                      name="email"
                      onChange={(e) => handleChange(e)}
                      value={formData.email}
                      type="text"
                      placeholder="Email"
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full">
                    <label
                      htmlFor="Address"
                      className="block mb-3 text-sm font-semibold text-gray-500"
                    >
                      Address
                    </label>
                    <textarea
                      className="w-full px-4 py-3 text-xs border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                      name="address"
                      onChange={(e) => handleChange(e)}
                      value={formData.address}
                      cols={20}
                      rows={4}
                      placeholder="Address"
                      defaultValue={""}
                    />
                  </div>
                </div>
                <div className="space-x-0 lg:flex lg:space-x-4">
                  <div className="w-full lg:w-1/2">
                    <label
                      htmlFor="city"
                      className="block mb-3 text-sm font-semibold text-gray-500"
                    >
                      City
                    </label>
                    <input
                      name="city"
                      type="text"
                      onChange={(e) => handleChange(e)}
                      value={formData.city}
                      placeholder="City"
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                  <div className="w-full lg:w-1/2 ">
                    <label
                      htmlFor="postcode"
                      className="block mb-3 text-sm font-semibold text-gray-500"
                    >
                      Postcode
                    </label>
                    <input
                      name="postcode"
                      onChange={(e) => handleChange(e)}
                      value={formData.postcode}
                      type="text"
                      placeholder="Post Code"
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <label className="flex items-center text-sm group text-heading">
                    <input
                      type="checkbox"
                      className="w-5 h-5 border border-gray-300 rounded focus:outline-none focus:ring-1"
                    />
                    <span className="ml-2">
                      Save this information for next time
                    </span>
                  </label>
                </div>
                <div className="relative pt-3 xl:pt-6">
                  <label
                    htmlFor="note"
                    className="block mb-3 text-sm font-semibold text-gray-500"
                  >
                    {" "}
                    Notes (Optional)
                  </label>
                  <textarea
                    name="note"
                    onChange={(e) => handleChange(e)}
                    value={formData.notes}
                    className="flex items-center w-full px-4 py-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                    rows={4}
                    placeholder="Notes for delivery"
                    defaultValue={""}
                  />
                </div>
                {/* payment method */}
                <p>
                  <label className="block text-sm font-semibold text-gray-500 my-4">
                    Payment Method
                  </label>
                </p>

                <select
                  onChange={(e) => setPayMethod(e.target.value)}
                  className="mb-8"
                >
                  <option value="cod">COD </option>
                  <option value="online">Online Payment </option>
                </select>
              </div>
            </form>
          </div>
          <div className="flex flex-col w-full ml-0 lg:ml-12 lg:w-2/5">
            <div className="pt-12 md:pt-0 2xl:ps-4">
              <h2 className="text-xl font-bold">Order Summary</h2>
              <div className="mt-8">
                {cartDetails.map((cartItem, index) => (
                  <div className="flex flex-col space-y-4">
                    <div className="flex space-x-4 mb-4">
                      <div>
                        <img
                          src="https://source.unsplash.com/collection/190727/1600x900"
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
                      {/* <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </div> */}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex p-4 mt-4">
                <h2 className="text-xl font-bold">ITEMS 2</h2>
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
    </div>
  );
}

export default PlaceOrder;
