import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="container">
      <h1 className="text-3xl font-medium text-gray-800 uppercase mb-6">
        Dashboard
      </h1>
      <div className="grid grid-cols-3 gap-6">
        {/* item */}
        <div className="shadow-lg">
          <div className="bg-gray-700 p-16">
            <div className="text-lg text-white">Total Orders</div>
            <div className="text-2xl text-white"> 3333</div>
            <Link to={"/admin-orders"}>
              <button className="bg-gray-800 rounded-xl text-white px-8 py-2 mt-4 hover:text-gray-900 hover:bg-white transition">
                View Orders
              </button>
            </Link>
          </div>
        </div>
        <div className="shadow-lg">
          <div className="bg-gray-700 p-16">
            <div className="text-lg text-white">Total Products</div>
            <div className="text-2xl text-white"> 238</div>
            <Link to={"/admin-products"}>
              <button className="bg-gray-800 rounded-xl text-white px-8 py-2 mt-4 hover:text-gray-900 hover:bg-white transition">
                View Products
              </button>
            </Link>
          </div>
        </div>
        <div className="shadow-lg">
          <div className="bg-gray-700 p-16">
            <div className="text-lg text-white">Total Users</div>
            <div className="text-2xl text-white"> 238</div>
            <Link to={"/admin-users"}>
              <button className="bg-gray-800 rounded-xl text-white px-8 py-2 mt-4 hover:text-gray-900 hover:bg-white transition">
                View Users
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
