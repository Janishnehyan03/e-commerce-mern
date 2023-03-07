import axios from "axios";

const Axios = axios.create({
  baseURL: "http://localhost:5000/api/v1",
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
