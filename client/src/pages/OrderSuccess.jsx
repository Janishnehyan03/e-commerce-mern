import React from "react";
import { Link } from "react-router-dom";

function OrderSuccess() {
  return (
    <div className="flex justify-center h-96">
      <div className="rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <h1 className="text-center text-5xl font-bold text-green-400">
            Order Success
          </h1>
        </div>
        <div className="text-center">
          <p className="text-gray-700 text-lg">Thank you for your order.</p>

          <p className="text-gray-700 text-lg">
            Your order has been received and is being processed.
          </p>
        </div>
        <div className="text-center my-4">
          <Link to="/">
            <button className="w-full px-6 py-2 text-white bg-blue-600 hover:bg-blue-900">
              Continue Shopping
            </button>
          </Link>
        </div>
        <div className="text-center">
          <Link to="/orders">
            <button className="w-full px-6 py-2 text-white bg-gray-400 hover:bg-gray-800 hover:text-white">
              view orders
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;
