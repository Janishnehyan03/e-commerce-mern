import React from "react";
import { data } from "../Data";
function Categories() {
  
  return (
    <>
      {/* category text*/}
      <div className="container py-16">
        <h2 className="text-3xl font-medium text-gray-800 uppercase mb-6">
          Shop by category
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {/* item */}
          {data.map((item) => (
            <div key={item.id} className="relative rounded-sm overflow-hidden group">
              <img src={item.image} alt={item.name} className="w-full h-80" />
              <a
                href="#"
                className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition"
              >
                {item.name}
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Categories;
