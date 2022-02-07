import React from "react";

function Profile() {
  return (
    <>
      <h1 className="text-3xl  text-center">Account Page </h1>
      <div className="flex justify-center">
        {/* account settings */}
        <div className="container grid grid-cols-4 gap-6 pt-4 pb-16 items-start ml-40">
          <div className="col-span-1 bg-white px-4 pb-6 shadow rounded overflow-hidden">
            <h1 className="font-medium text-center">My orders </h1>
          </div>
          <div className="col-span-1 bg-white px-4 pb-6 shadow rounded overflow-hidden">
            <h1 className="font-medium text-center">My orders </h1>
          </div>
          <div className="col-span-1 bg-white px-4 pb-6 shadow rounded overflow-hidden">
            <h1 className="font-medium text-center">My orders </h1>
          </div>
          <div className="col-span-3 bg-gray-100 px-4 pb-6 shadow rounded overflow-hidden">
            <h1 className="font-medium text-center">Personal Information</h1>
            <div className="flex justify-center">
              <div className="w-full">
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="px-3">
                    <label>Name </label>
                    <input
                      type={`text`}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={`John Doe`}
                    />
                  </div>
                  <div className="px-3">
                    <label>Name </label>
                    <input
                      type={`text`}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={`John Doe`}
                    />
                  </div>
                  <div className="px-3">
                    <label>Name </label>
                    <input
                      type={`text`}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={`John Doe`}
                    />
                  </div>
                  <div className="px-3">
                    <label>Name </label>
                    <input
                      type={`text`}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={`John Doe`}
                    />
                  </div>
                  <div className="px-3">
                    <label>Name </label>
                    <input
                      type={`text`}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={`John Doe`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
