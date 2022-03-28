import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "../Axios";

function AddressPage() {
  const [address, setAddress] = useState([]);
  const getAllAddress = async () => {
    let res = await Axios.post("/users/my-address/");
    if (res.data.success) {
      setAddress(res.data.address);
    }
  };
  const makeDefault = async (id) => {
    let res = await Axios.patch("/users/address/default/" + id);
    if (res.data.success) {
      getAllAddress();
    }
  };
  useEffect(() => {
    getAllAddress();
  }, []);
  return (
    <div>
      <h1 className="text-2xl font-bold text-center">Manage Address</h1>
      <div className="flex justify-center">
        {address.map((address, index) => (
          <div className="max-w-sm rounded overflow-hidden shadow-lg ml-5 mt-5 px-10">
            <div className="px-6 py-4 relative">
              <div className="font-bold text-xl mb-2 text-blue-400">
                Address {index + 1}{" "}
              </div>
              <p className="text-gray-700 text-base">
                <span className="text-black font-bold">house: </span>{" "}
                {address.address}
              </p>
              <p className="text-gray-700 text-base">
                <span className="text-black font-bold">city: </span>{" "}
                {address.city}
              </p>
              <p className="text-gray-700 text-base">
                <span className="text-black font-bold">state: </span>{" "}
                {address.state}
              </p>
              <p className="text-gray-700 text-base">
                <span className="text-black font-bold">zip: </span>{" "}
                {address.zip}
              </p>
              <p className="text-gray-700 text-base">
                <span className="text-black font-bold">country: </span>{" "}
                {address.country}
              </p>
              <Link
                to={`/address/edit/${address._id}`}
                className="absolute top-0 right-0"
              >
                <p className="text-blue-400 font-bold">Edit</p>
              </Link>
              {address.isDefault ? (
                <p className="text-green-400 font-bold">Default Address</p>
              ) : (
                <button
                  onClick={(e) => makeDefault(address._id)}
                  className="flex justify-center mt-10 bg-gray-300 px-4 py-2 hover:bg-white hover:text-gray-800 hover:border-2"
                >
                  Make Default
                </button>
              )}
            </div>
          </div>
        ))}
        {/* add new address route link */}
        <Link to="/add-address" className="ml-5 mt-5">
          <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
            Add New Address
          </button>
        </Link>
      </div>
    </div>
  );
}

export default AddressPage;
