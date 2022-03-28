import { createContext, useState } from "react";
import Axios from "../Axios";

export const UserAuthContext = createContext({});

export const UserAuthProvider = (props) => {
  const [authData, setAuthData] = useState(null);
  const getAuthData = async () => {
    try {
      let res = await Axios.post("/auth/check-loggedIn/");
      // console.log(res);
      console.log(res.data);
      if (res.data.success) {
        setAuthData(res.data.user);
      }
    } catch (error) {
      if (error.status === 401) {
        setAuthData(null);
      } else if (error.error === "User not found") {
        Axios.post("/auth/logout/");
      }
    }
  };
  const value = {
    getAuthData,
    authData,
    setAuthData,
  };
  return (
    <UserAuthContext.Provider value={value}>
      {props.children}
    </UserAuthContext.Provider>
  );
};
