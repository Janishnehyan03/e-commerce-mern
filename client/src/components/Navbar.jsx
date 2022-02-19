import React, { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import Axios from "../Axios";
import { CartDetailsContext } from "../context/CartDetails";
import { UserAuthContext } from "../context/UserAuth";
import { useContext } from "react";
import CartModel from "../pages/CartModel";

function Nav() {
  const { cartDetails } = useContext(CartDetailsContext);
  const { getAuthData, authData, setAuthData } = useContext(UserAuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const user = authData;
  const [cartOpen, setCartOpen] = useState(false);
  const logout = async () => {
    let res = await Axios.post("/auth/logout");
    if (res.status === 200) {
      setAuthData(null);
      window.location.reload();
    }
  };
  useEffect(() => {
    getAuthData();
  }, []);
  return (
    <div>
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <>
              <div className="flex items-center">
                <Link to="/">
                  <div className="flex-shrink-0">
                    <img
                      className="h-8 w-8"
                      src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                      alt="Workflow"
                    />
                  </div>
                </Link>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {user && user.isAdmin ? (
                      <Link
                        to={"/dashboard"}
                        className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Dashboard
                      </Link>
                    ) : (
                      ""
                    )}
                    <div
                      onClick={() => setCartOpen(!cartOpen)}
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                    >
                      Cart{" "}
                      <span class="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-green-600 rounded-sm">
                        {cartDetails.length}
                      </span>
                    </div>

                    <Link
                      to={"/orders"}
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Orders
                    </Link>
                  </div>
                </div>
              </div>

              {user && (
                <>
                  {/* user photo and name */}
                  <div className="hidden md:block">
                    <Link to={"/profile/"}>
                      <div className="ml-4 flex items-center md:ml-6">
                        <h1 className="text-white font-bold mr-4">
                          Hi, {user.username}
                        </h1>
                        <img
                          className="w-12 rounded-3xl"
                          src={user.image}
                          alt={user.username}
                        />
                      </div>
                    </Link>
                  </div>
                </>
              )}
              {user ? (
                <button
                  onClick={logout}
                  className="hidden md:block bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-primary transition"
                >
                  logout
                </button>
              ) : (
                <Link
                  className="hidden md:block bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-green-500 transition"
                  to={"/login"}
                >
                  login
                </Link>
              )}
            </>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div className="md:hidden" id="mobile-menu">
              <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link
                  href="#"
                  className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Dashboard
                </Link>
              </div>
            </div>
          )}
        </Transition>
      </nav>
      <CartModel open={cartOpen} setOpen={setCartOpen} />
    </div>
  );
}

export default Nav;
