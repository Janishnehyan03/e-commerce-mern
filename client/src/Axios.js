import axios from "axios";

const Axios = axios.create({
  baseURL: "/api/v1",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "*",
    // authorization: `Bearer ${token}`,
  },
  withCredentials: true,
});

export default Axios;
