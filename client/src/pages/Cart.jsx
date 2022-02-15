import React, { useContext, useEffect, useState } from "react";
import Axios from "../Axios";
import { CartDetailsContext } from "../context/CartDetails";
import { Link } from "react-router-dom";

function CartPage() {
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
    <div>
      <div className="flex flex-wrap justify-center my-44">
        <>
          <h1 className="text-3xl text-center absolute right-4 font-bold">
            Total Price: ${" "}
            <span
              style={{
                backgroundColor: "ButtonHighlight",
                borderRadius: "10px",
                padding: "10px 20px",
              }}
            >
              {totalPrice}
            </span>
          </h1>
          {/* create a cart table */}
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  {cartDetails.length > 0 ? (
                    <table className="min-w-full divide-y divide-gray-200 px-8 my-4">
                      <>
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Item
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Description
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Price
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Qty
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Total
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Remove
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {cartDetails.map((product, index) => (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-10 w-10">
                                    <img
                                      className="h-10 w-10 rounded-full"
                                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
                                      alt=""
                                    />
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">
                                      {product.product.title}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      -
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {product.product.description}
                                </div>
                                <div className="text-sm text-gray-500">.</div>
                              </td>

                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  {product.product.price}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {/* minus button  */}
                                {product.quantity > 1 && (
                                  <button
                                    onClick={() =>
                                      increaseQuantity(product.product._id, -1)
                                    }
                                    className="text-2xl leading-5 bg-gray-200 p-2 hover:bg-gray-400 hover:text-white transition"
                                  >
                                    -
                                  </button>
                                )}
                                {/* qty */}
                                <span className="px-2 inline-flex text-3xl leading-5 font-semibold">
                                  {product.quantity}
                                </span>
                                {/* plus button */}
                                <button
                                  onClick={() =>
                                    increaseQuantity(product.product._id, 1)
                                  }
                                  className="text-2xl leading-5 bg-gray-200 p-2 hover:bg-gray-400 hover:text-white transition"
                                >
                                  +
                                </button>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {product.totalPrice}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <button
                                  onClick={() =>
                                    removeFromCart(
                                      product.product._id,
                                      product.product.title
                                    )
                                  }
                                >
                                  <i className="fas fa-trash-alt text-primary"></i>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </>
                    </table>
                  ) : (
                    <>
                      <div className="container mx-auto p-24">
                        <div className="flex flex-col items-center justify-center">
                          <div className="flex-shrink-0 h-20 w-20">
                            <img
                              className="h-full w-full"
                              src="https://www.freepnglogos.com/uploads/shopping-cart-png/shopping-cart-svg-png-icon-download-28.png"
                              alt=""
                            />
                          </div>
                          <div className="mt-4">
                            <h1 className="text-center text-2xl font-bold">No items in cart</h1>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                {cartDetails.length > 0 && (
                  <button
                    onClick={() => clearCart()}
                    className="bg-red-400 text-white hover:bg-primary transition cursor-pointer px-4 py-4 mt-4 absolute left-4  top-48"
                  >
                    Clear Cart
                  </button>
                )}
              </div>
            </div>
          </div>
          {/* create a cart table */}
        </>
      </div>
      {cartDetails.length > 0 && (
        <Link
          to="/place-order"
          className="bg-green-400 text-white hover:bg-gray-800 transition cursor-pointer px-4 py-4 mt-4 absolute right-4 top-48"
        >
          Place Order
        </Link>
      )}
    </div>
  );
}

export default CartPage;
