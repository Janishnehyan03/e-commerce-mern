import React from "react";
import { useState, useEffect } from "react";
import Axios from "../../Axios";
import moment from "moment";

function All_orders() {
  const [orders, setOrders] = useState([]);
  const getAllOrders = async () => {
    try {
      const response = await Axios.get("/orders");
      setOrders(response.data.orders);
      console.log(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    getAllOrders();
  }, []);
  return (
    <div>
      <h1 className="text-3xl text-center  font-bold">All Orders</h1>
      {orders && (
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Order ID</th>
              <th className="px-4 py-2">User ID</th>
              <th className="px-4 py-2">Products</th>
              <th className="px-4 py-2">Qty</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Total Price</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Address</th>
              <th className="px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="border px-4 py-2">{order._id}</td>
                <td className="border px-4 py-2">{order.userId._id}</td>
                <td className="border px-4 py-2">
                  <ul>
                    {order.products.map((product) => (
                      <li className="border px-4 py-2" key={product._id}>
                        {product.productId.title}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="border px-4 py-2">
                  <ul>
                    {order.products.map((product) => (
                      <li className="border px-4 py-2" key={product._id}>
                        {product.quantity}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="border px-4 py-2">
                  <ul>
                    {order.products.map((product) => (
                      <li className="border px-4 py-2" key={product._id}>
                        {product.productId.price}
                      </li>
                    ))}
                  </ul>
                </td>

                <td className="border px-4 py-2">{order.amount}</td>
                <td className="border px-4 py-2">{order.status}</td>
                <td className="border px-4 py-2">{order.address}</td>
                <td className="border px-4 py-2">
                  {moment(order.updatedAt).format("MMMM Do YYYY, h:mm:ss a")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default All_orders;
