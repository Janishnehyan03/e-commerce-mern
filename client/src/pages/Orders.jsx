import React, { useEffect, useState } from "react";
import Axios from "../Axios";
import moment from "moment";

function Orders() {
  const [orders, setOrders] = useState([]);
  console.log(orders);
  const getMyOrders = async () => {
    try {
      let res = await Axios.post("/orders/my-orders");
      setOrders(res.data.orders);
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    getMyOrders();
  }, []);
  return (
    <div>
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
            Your orders
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {orders.map((product) => (
              <div key={product.id} className="group relative">
                <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                  <img
                    src={
                      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
                    }
                    alt={product.title}
                    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={product.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.product[0].title}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      qty {product.products.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    $ {product.product[0].price}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-500">
                  {moment(product.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                </p>
                <div className="mt-4 flex justify-between">
                  <p className="text-sm font-medium text-gray-500">
                    {product.status === "cod"
                      ? "Cash on delivery"
                      : "Payment received"}
                  </p>
                  <p className="text-sm font-medium text-gray-500">
                    {product.status === "cod" ? "Pending" : "Delivered"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
