import React from "react";

export default function Footer() {
  return (
    <>
      <div className="bg-white pt-16 pb-12 border-t border-gray-100">
        <div className="container grid grid-cols-3">
          {/* footer text */}
          <div className="col-span-1 space-y-8">
            <img
              className="h-8 w-8"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
              alt="Workflow"
            />
            <p className="text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>
          {/* footer text */}

          {/* footer links */}
          <div className="col-span-2 grid grid-cols-2 gap-8">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                  solutions
                </h3>
                <div className="mt-4 space-y-4">
                  <a
                    href="#"
                    className="text-base text-gray-600 hover:text-gray-900 block"
                  >
                    Marketting
                  </a>
                  <a
                    href="#"
                    className="text-base text-gray-600 hover:text-gray-900 block"
                  >
                    Marketting
                  </a>
                  <a
                    href="#"
                    className="text-base text-gray-600 hover:text-gray-900 block"
                  >
                    Marketting
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                  solutions
                </h3>
                <div className="mt-4 space-y-4">
                  <a
                    href="#"
                    className="text-base text-gray-600 hover:text-gray-900 block"
                  >
                    Marketting
                  </a>
                  <a
                    href="#"
                    className="text-base text-gray-600 hover:text-gray-900 block"
                  >
                    Marketting
                  </a>
                  <a
                    href="#"
                    className="text-base text-gray-600 hover:text-gray-900 block"
                  >
                    Marketting
                  </a>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                  solutions
                </h3>
                <div className="mt-4 space-y-4">
                  <a
                    href="#"
                    className="text-base text-gray-600 hover:text-gray-900 block"
                  >
                    Marketting
                  </a>
                  <a
                    href="#"
                    className="text-base text-gray-600 hover:text-gray-900 block"
                  >
                    Marketting
                  </a>
                  <a
                    href="#"
                    className="text-base text-gray-600 hover:text-gray-900 block"
                  >
                    Marketting
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                  solutions
                </h3>
                <div className="mt-4 space-y-4">
                  <a
                    href="#"
                    className="text-base text-gray-600 hover:text-gray-900 block"
                  >
                    Marketting
                  </a>
                  <a
                    href="#"
                    className="text-base text-gray-600 hover:text-gray-900 block"
                  >
                    Marketting
                  </a>
                  <a
                    href="#"
                    className="text-base text-gray-600 hover:text-gray-900 block"
                  >
                    Marketting
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* footer links */}
        </div>
      </div>

      {/* copyright */}
      <div className="bg-gray-800 py-4">
        <div className="container flex items-center justify-between">
          <p className="text-gray-400 text-sm">© 2020 Copyright:</p>

          <a
            href="#"
            className="text-white ml-auto mr-auto hover:text-gray-500"
          >
            <img
              className="h-8 w-8"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
              alt="Workflow"
            />
          </a>
        </div>
      </div>
      {/* copyright */}
    </>
  );
}
