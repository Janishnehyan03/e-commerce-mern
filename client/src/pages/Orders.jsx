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
      <h1 className="text-3xl text-center">My Orders</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Order ID</th>
            <th className="px-4 py-2">Order Date</th>
            <th className="px-4 py-2">Item </th>
            <th className="px-4 py-2">Price </th>
            <th className="px-4 py-2">Qty</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td className="border px-4 py-2">{order._id}</td>
              <td className="border px-4 py-2">
                {moment(order.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
              </td>
              <td className="border px-4 py-2 text-center">
                <p className="text-center">{order.product[0].title}</p>
              </td>
              <td className="border px-4 py-2 text-center">
                <p className="text-center">{order.product[0].price}</p>
              </td>
              <td className="border px-4 py-2 text-center">
                <p className="text-center">{order.products.quantity}</p>
              </td>
              <td
                className="border px-4 py-2"
                style={{
                  color: order.status === "cod" ? "#e8b80c" : "#27f584",
                }}
              >
                {order.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
