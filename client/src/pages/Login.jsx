import React, { useState } from "react";
import Axios from "../Axios";
import { CircularProgress } from "@material-ui/core";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, Redirect } from "react-router-dom";
import Cookies from 'universal-cookie';


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const cookies = new Cookies();

  // redirect to home page if token exist
  const isAuthenticated = localStorage.getItem("token");
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let res = await Axios.post("/auth/login", { email, password });
      if (res.data.status === "success") {
        setLoading(false);
        //  store token in local storage
        // localStorage.setItem("token", res.data.token, {
        //   expires: new Date(Date.now() + 3600 * 1000), // 1 hour
        // });
        cookies.set("jwt", res.data.token, {
          maxAge: 1000 * 60 * 60 * 24 * 7,
        });
        localStorage.setItem("user", JSON.stringify(res.data.user));
        toast.success("Login Successful");
        //  redirect to home page
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error.response.data.message);
      setLoading(false);
      toast.error(error.response.data.message, {
        position: "top-center",
      });
    }
  };
  return (
    <>
      <div className="container py-16">
        <ToastContainer />
        <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
          <h2 className="text-2xl uppercase font-medium mb-1">Login</h2>
          <p className="text-gray-600 mb-6 text-sm">
            login if you are a customer
          </p>
          <form action="#">
            <div className="space-y-4">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Email
                </label>
                <input
                  type="text"
                  className="block w-full border border-gray-300 px-4 py-3 text-sm rounded focus:ring-0 focus:border-primary placeholder:text-gray-700"
                  placeholder="enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Password
                </label>
                <input
                  type="password"
                  className="block w-full border border-gray-300 px-4 py-3 text-sm rounded focus:ring-0 focus:border-primary placeholder:text-gray-700"
                  placeholder="enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="agree"
                  className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                />
                <label
                  htmlFor="agree"
                  className="text-gray-500 ml-3 cursor-pointer"
                >
                  Remeber me
                </label>
              </div>
              <a href="#" className="text-primary">
                forgot password?
              </a>
            </div>
            {loading ? (
              <CircularProgress />
            ) : (
              <button
                onClick={login}
                className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium mt-4"
              >
                login
              </button>
            )}
          </form>

          <div className="mt-6 flex justify-center relative">
            <div className="text-gray-600 uppercase px-3 bg-white z-10 relative">
              Or Login With
            </div>
            <div className="absolute left-0 top-3 w-full border-b-2 border-gray-200"></div>
          </div>

          {/* login with  google and facebook*/}
          <div className="flex items-center justify-between mt-12">
            <div className="flex items-center border border-gray-200 rounded-3xl px-4 py-2 hover:border-black transition hover:cursor-pointer">
              <img
                src="https://img.icons8.com/color/48/000000/google-logo.png"
                alt="google"
                className="w-8 h-8 mr-2"
              />
              <span className="text-gray-500">Login with Google</span>
            </div>
            <div className="flex items-center  border border-gray-200 rounded-3xl px-4 py-2 hover:border-black transition hover:cursor-pointer">
              <img
                src="https://img.icons8.com/color/48/000000/facebook-new.png"
                alt="facebook"
                className="w-8 h-8 mr-2"
              />
              <span className="text-gray-500">Login with Facebook</span>
            </div>
          </div>
          {/* login with google and facebook*/}
          <p className="mt-4 text-gray-600 text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
