import React from "react";

function Features() {
  return (
    <>
      <div className="container flex-1 items-center ml-4 mt-4">
        <div className="w-10/12 grid sm:grid-cols-1 md:grid-cols-3  gap-6 max-auto justify-center ">
          <div className="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
            {/* delivery van image from online */}
            <img
              src="https://cdn-icons-png.flaticon.com/512/1950/1950321.png"
              alt="delivery van"
              className="w-12 h-12 object-cover"
            />
            <div>
              <h4 className="font-medium capitalize text-lg">Free Delivery </h4>
              <p className="text-gray-500 text-sm">order over $200</p>
            </div>
          </div>
          <div className="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
            {/* delivery van image from online */}
            <img
              src="https://cdn-icons-png.flaticon.com/512/1077/1077976.png"
              alt="delivery van"
              className="w-12 h-12 object-cover"
            />
            <div>
              <h4 className="font-medium capitalize text-lg">Money Returns </h4>
              <p className="text-gray-500 text-sm">30 days money return</p>
            </div>
          </div>
          <div className="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
            {/* delivery van image from online */}
            <img
              src="https://cdn-icons-png.flaticon.com/512/3171/3171099.png"
              alt="delivery van"
              className="w-12 h-12 object-cover"
            />
            <div>
              <h4 className="font-medium capitalize text-lg">Support Team </h4>
              <p className="text-gray-500 text-sm">24x7 support</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Features;
