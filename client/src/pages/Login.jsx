import React from "react";
import Axios from "../Axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Redirect } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
// import FacebookLogin from "react-facebook-login";
import { UserAuthContext } from "../context/UserAuth";
import { useContext } from "react";

function Login() {
  // redirect to home page if token exist
  const { authData } = useContext(UserAuthContext);
  if (authData) {
    return <Redirect to="/" />;
  }
  const loginWithGoogle = async ({ profileObj }) => {
    let res = await Axios.post("/auth/google/signUp", {
      email: profileObj.email,
      name: profileObj.name,
      image: profileObj.imageUrl,
      firsname: profileObj.givenName,
      lastname: profileObj.familyName,
      googleId: profileObj.googleId,
    });
    if (res.data.success) {
      toast.success(res.data.message, {
        position: "top-right",
      });
      window.location.reload();
    }
  };

  return (
    <>
      <div className="container py-16">
        <ToastContainer />
        <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
          <h2 className="text-2xl  font-medium mb-1">
            Login with <span className="text-blue-700">G</span>
            <span className="text-red-700">o</span>
            <span className="text-orange-300">o</span>
            <span className="text-blue-300">g</span>
            <span className="text-green-300">l</span>
            <span className="text-red-300">e</span>{" "}
          </h2>
          <p className="text-gray-600 mb-6 text-sm">
            login if you are a customer
          </p>

          {/* login with  google and facebook*/}
          <div className="flex items-center justify-between mt-12">
            <GoogleLogin
                clientId="504304381401-lurd70laott0g5djebu60112qcs6kvr5.apps.googleusercontent.com"
                buttonText="Login with Google"
              onSuccess={loginWithGoogle}
              onFailure={loginWithGoogle}
              cookiePolicy={"single_host_origin"}
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className="flex items-center border border-gray-200 rounded-3xl px-4 py-2 hover:border-black transition hover:cursor-pointer"
                >
                  <img
                    src="https://img.icons8.com/color/48/000000/google-logo.png"
                    alt="google"
                    className="w-8 h-8 mr-2"
                  />
                  <span className="text-gray-500">Login with Google</span>
                </button>
              )}
            />

            {/* </div> */}
            {/* <FacebookLogin
              appId="467459588371584"
              fields="name,email,picture"
              callback={loginWithFacebook}
              cssClass="btnFacebook"
              icon={
                <img src="https://img.icons8.com/color/48/000000/facebook-new.png" />
              }
            /> */}
            <div className="flex items-center  border border-gray-200 rounded-3xl px-4 py-2 hover:border-black transition hover:cursor-pointer"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
