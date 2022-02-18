import React from "react";
import { Link } from "react-router-dom";
import { data } from "../Data";
function Categories() {
  return (
    <>
      {/* category text*/}
      <div className="container py-16">
        <h2 className="text-3xl font-medium text-gray-800 uppercase mb-6">
          Shop by category
        </h2>
        <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-3">
          {/* item */}
          {data.map((item) => (
            <Link to="/shop">
              <div
                key={item.id}
                className="relative rounded-sm overflow-hidden group"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-80 sm:h-96"
                />
                <a
                  href="#"
                  className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition"
                >
                  {item.name}
                </a>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Categories;
