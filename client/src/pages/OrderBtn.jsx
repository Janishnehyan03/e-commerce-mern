import React from "react";
import { toast } from "react-toastify";
import Axios from "../Axios";
import { useHistory } from "react-router-dom";

function OrderBtn({
  payMethod,
  getCartDetails,
  cartDetails,
  formData,
  getTotal,
  totalPrice,
  setFormData,
  user,
}) {
  const history = useHistory();
  const placeOrderCod = async (e) => {
    e.preventDefault();
    try {
      let res = await Axios.post("/orders/", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        address: formData.address,
        phone: formData.phone,
        amount: totalPrice + 10,
        city: formData.city,
        postcode: formData.postcode,
        notes: formData.notes,
        products: cartDetails,
        userId: user._id,
        payMethod: payMethod,
      });
      if (res.data.success) {
        window.location.href = "/success-order";
      }
    } catch (error) {
      console.log(error.response);
      toast.error("Error Placing Order", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };
  return (
    <div>
      {payMethod === "cod" ? (
        <button
          onClick={(e) => placeOrderCod(e)}
          className="w-full px-6 py-2 text-white bg-blue-600 hover:bg-blue-900"
        >
          Place Order Now
        </button>
      ) : (
        <button
          //   onClick={(e) => placeOrderOnline(e)}
          className="w-full px-6 py-2 text-white bg-blue-600 hover:bg-blue-900"
        >
          Online Payment
        </button>
      )}
    </div>
  );
}

export default OrderBtn;
