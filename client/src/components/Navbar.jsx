import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "../Axios";
import Cookies from "universal-cookie";
import { CartContext } from "../context/CartCount";
import { CartDetailsContext } from "../context/CartDetails";
import { SearchContext } from "../context/Search";

function Navbar() {
  const { cartCount, getCartCount } = useContext(CartContext);
  const { search, setSearch, getSearchData } = useContext(SearchContext);
  const { cartDetails } = useContext(CartDetailsContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const cookies = new Cookies();

  const logout = async () => {
    try {
      await Axios.post("/auth/logout");
      cookies.remove("jwt");
      // redirect to homepage with newtab
      window.open("/", "_blank");
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    user && getCartCount();
  }, [cartDetails]);
  return (
    <>
      <header className="py-4 shadow-sm bg-white m-6">
        <div className="container flex items-center justify-between">
          {/* logo */}
          <Link to={"/"}>
            {/* <h1 className="text-4xl">LOGO</h1> */}
            <img
              src="https://www.pngfind.com/pngs/m/56-565024_amazon-logo-png-amazon-png-transparent-png.png"
              alt="logo"
              className="h-12"
            />
          </Link>

          {/* searchbar */}
          <div className="w-full max-w-xl relative flex">
            <span className="absolute left-4 top-3 text-lg text-gray-400">
              <i className="fas fa-search"></i>
            </span>
            <input
              type="text"
              className="w-full border border-primary border-r-0 pl-12 py-3 pr-3 rounded-1-md focus:outline-none"
              placeholder="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Link
              to={"/search"}
              onClick={(e) => getSearchData(e)}
              className="bg-primary border border-primary text-white px-8 rounded-r-md hover:bg-transparent hover:text-primary transition"
            >
              search
            </Link>
          </div>
          {/* icons */}
          <div className="flex items-center space-x-4">
            <Link className="text-center text-gray-700 hover:text-primary transition relative">
              <div className="text-2xl">
                <i className="fas fa-heart"></i>
              </div>
              <div className="text-xs leading-3">wish list</div>
              <span className="absolute right-0 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
                8
              </span>
            </Link>
            <Link to={"/cart"}>
              <div className="text-center transition relative hover:text-primary">
                <div className="text-2xl">
                  <i class="fas fa-shopping-cart"></i>
                </div>
                <div className="text-xs leading-3">cart</div>
                <span className="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
                  {cartCount}
                </span>
              </div>
            </Link>
            <Link to={"/orders"}>
              <div className="text-center transition relative hover:text-primary">
                <div className="text-2xl">
                  <i className="fas fa-shopping-bag"></i>
                </div>
                <div className="text-xs leading-3">orders</div>
                {/* <span className="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
                  {cartCount}
                </span> */}
              </div>
            </Link>
            <Link
              to={"/profile"}
              className="text-center text-gray-700 hover:text-primary transition relative"
            >
              <div className="text-2xl">
                <i className="fas fa-user"></i>
              </div>
              <div className="text-xs leading-3">
                {user ? user.username : "profile"}
              </div>
              <span className="absolute right-0 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
                8
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* navbar 2 */}
      <nav className="bg-gray-800">
        <div className="container flex mx-36">
          <div className="px-8 py-4 bg-primary flex items-center cursor-pointer  ml-5 relative group">
            <span className="text-white">
              <i className="fas fa-bars"></i>
            </span>
            <span className="capitalize ml-2 text-white">All Categories</span>
            <div className="absolute w-full left-0 top-full bg-white shadow-md py-3 divide-y divide-gray-300 divide-dashed opacity-0 group-hover:opacity-100 transition duration-300 invisible group-hover:visible">
              <Link className="flex items-center px-6 py-3 hover:bg-gray-100 transition">
                <img
                  src="https://cdn-icons.flaticon.com/png/512/3351/premium/3351414.png?token=exp=1642912682~hmac=8256b0ff2de79c5d425dbbb79ccd0858"
                  alt="sofa svg"
                  className="w-5 h-5 object-contain"
                />
                <span className="ml-6 text-gray-600 text-sm">Sofa</span>
              </Link>
              <a
                href="#"
                className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/0/191.png"
                  alt="sofa svg"
                  className="w-5 h-5 object-contain"
                />
                <span className="ml-6 text-gray-600 text-sm">Mobiles</span>
              </a>
              <a
                href="#"
                className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2933/2933190.png"
                  alt="sofa svg"
                  className="w-5 h-5 object-contain"
                />
                <span className="ml-6 text-gray-600 text-sm">Desktops</span>
              </a>
              <a
                href="#"
                className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1599/1599910.png"
                  alt="sofa svg"
                  className="w-5 h-5 object-contain"
                />
                <span className="ml-6 text-gray-600 text-sm">Office </span>
              </a>
              <a
                href="#"
                className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
              >
                <img
                  src="https://cdn-icons.flaticon.com/png/512/2851/premium/2851928.png?token=exp=1642912992~hmac=3501bdb81da571f7452cd10bdb5e13b3"
                  alt="sofa svg"
                  className="w-5 h-5 object-contain"
                />
                <span className="ml-6 text-gray-600 text-sm">Kitchen</span>
              </a>
            </div>
          </div>
          <div className="flex items-center justify-between flex-grow pl-12">
            <div className="flex items-center space-x-6 capitalize">
              <Link
                to={"/"}
                className="text-gray-200 hover:text-white  transition"
              >
                Home
              </Link>
              <Link
                to={"/shop"}
                className="text-gray-200 hover:text-white transition"
              >
                Shop
              </Link>
              <Link
                to={"/view"}
                className="text-gray-200 hover:text-white transition"
              >
                view
              </Link>
            </div>
            {user ? (
              <>
                {user.isAdmin && (
                  <Link to={"/dashboard"}>
                    <button className="text-white bg-gray-500 rounded-3xl mr-36 px-4 py-2 hover:text-primary hover:bg-white transition">
                      Dashboard
                    </button>
                  </Link>
                )}
                {/* logout btn */}
                <button
                  onClick={logout}
                  className="text-white bg-primary rounded-3xl mr-36 px-4 py-2 hover:text-primary hover:bg-white transition"
                >
                  logout
                </button>
              </>
            ) : (
              <Link to={"/login"}>
                <div className="text-white bg-green-400 rounded-3xl mr-36 px-4 py-2 hover:text-green-400 hover:bg-white transition">
                  login
                </div>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
