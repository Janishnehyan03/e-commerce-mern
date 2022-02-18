/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import React, { useContext, useEffect } from "react";
import Axios from "../Axios";
import { CartDetailsContext } from "../context/CartDetails";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Throwback Hip Bag",
    href: "#",
    color: "Salmon",
    price: "$90.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
    imageAlt:
      "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
  },
  {
    id: 2,
    name: "Medium Stuff Satchel",
    href: "#",
    color: "Blue",
    price: "$32.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
    imageAlt:
      "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
  },
  // More products...
];

export default function CartModel({ open, setOpen }) {
  const { cartDetails, getCartDetails } = useContext(CartDetailsContext);
  const [totalPrice, setTotalPrice] = useState(0);

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
  const increaseQuantity = async (id, count) => {
    await Axios.patch(`/carts/quantity/${id}`, {
      quantity: count,
    });
    getCartDetails();
  };

  const clearCart = async () => {
    if (window.confirm("Are you sure you want to clear cart?")) {
      try {
        let res = await Axios.delete("/carts");
        getCartDetails();
        setOpen(false);
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    getTotal();
  }, [cartDetails]);

  useEffect(() => {
    getCartDetails();
  }, []);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden"
        onClose={setOpen}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-md">
                <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                  <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-medium text-gray-900">
                        Shopping cart
                      </Dialog.Title>
                      <div className="ml-3 h-7 flex items-center">
                        <button
                          type="button"
                          className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                          onClick={() => setOpen(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <i class="fa-solid fa-xmark"></i>
                        </button>
                      </div>
                    </div>

                    {cartDetails.length === 0 ? (
                      <div className="flex flex-col items-center justify-center p-4">
                        <div className="text-center text-gray-500">
                          <i class="fa-solid fa-shopping-cart"></i>
                          <h1 className="text-2xl">Your cart is empty</h1>
                          <Link to="/">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                              Continue shopping
                            </button>
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-8">
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {cartDetails.map((product) => (
                              <li key={product.id} className="py-6 flex">
                                <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                                  <img
                                    src={product.product.img}
                                    alt={product.product.title}
                                    className="w-full h-full object-center object-cover"
                                  />
                                </div>

                                <div className="ml-4 flex-1 flex flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <a href={product.href}>
                                          {product.product.title}
                                        </a>
                                      </h3>
                                      <p className="ml-4">
                                        {product.totalPrice}
                                      </p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">
                                      {product.product.description}
                                    </p>
                                  </div>
                                  <div className="flex-1 flex items-end justify-between text-sm">
                                    {/* increase quantity selector */}

                                    <div className="flex-1 flex items-center justify-between">
                                      <div className="flex items-center">
                                        <button
                                          type="button"
                                          className="p-1 text-gray-400 hover:text-gray-500 bg-gray-600"
                                          onClick={() =>
                                            increaseQuantity(
                                              product.product._id,
                                              -1
                                            )
                                          }
                                        >
                                          <i class="fa-solid fa-minus"></i>
                                        </button>
                                        <p className="text-gray-800 m-3">
                                          {product.quantity}
                                        </p>
                                        <button
                                          type="button"
                                          className="p-1 text-gray-400 hover:text-gray-500 bg-gray-600"
                                          onClick={() =>
                                            increaseQuantity(
                                              product.product._id,
                                              1
                                            )
                                          }
                                        >
                                          <i class="fa-solid fa-plus"></i>
                                        </button>
                                      </div>
                                    </div>

                                    <div className="flex">
                                      <button
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                        onClick={() =>
                                          removeFromCart(
                                            product.product._id,
                                            product.product.title
                                          )
                                        }
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                  {cartDetails.length > 0 && (
                    <>
                      {" "}
                      <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Subtotal</p>
                          <p>$ {totalPrice}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          Shipping and taxes calculated at checkout.
                        </p>
                        <div className="mt-6">
                          <Link
                            to={"/place-order"}
                            onClick={() => setOpen(false)}
                            className="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                          >
                            Checkout
                          </Link>
                        </div>
                        <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                          <p>
                            <button
                              type="button"
                              className="text-indigo-600 font-medium hover:text-indigo-500"
                              onClick={() => setOpen(false)}
                            >
                              Continue Shopping
                            </button>{" "}
                            or{" "}
                            <button
                              type="button"
                              className="text-red-600 font-medium hover:text-red-500"
                              onClick={() => clearCart()}
                            >
                              clear cart
                            </button>
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
