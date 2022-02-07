import axios from "axios";
import Cookies from "universal-cookie";
// const token = localStorage.getItem("token");
const token = new Cookies().get("jwt");

const Axios = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "*",
    authorization: `Bearer ${token}`,
  },
  withCredentials: true,
});

export default Axios;
