import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "../Axios";
import { useEffect } from "react";

function Categories() {
  const [categories, setCategories] = useState([]);
  const getAllCategories = async () => {
    let { data } = await Axios.get("/categories");
    setCategories(data.categories);
  };
  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <>
      {/* category text*/}
      <div className="container py-16">
        <h2 className="text-3xl font-medium text-gray-800 uppercase mb-6">
          Shop by category
        </h2>
        <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-3">
          {/* item */}
          {categories.map((item) => (
            <Link to={`/category/${item._id}`}>
              <div
                key={item._id}
                className="relative rounded-sm overflow-hidden group"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-80 sm:h-96"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">
                  {item.name}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Categories;
