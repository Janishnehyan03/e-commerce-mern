import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Axios from "../Axios";

function OrderBtn({ payMethod, cartDetails, formData, totalPrice, user }) {
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  const placeOrder = async (e, response) => {
    e.preventDefault();
    try {
      let res = await Axios.post("/orders/", {
        email: formData.email,
        address: formData.address,
        phone: formData.phone,
        amount: totalPrice,
        city: formData.city,
        postcode: formData.postcode,
        notes: formData.notes,
        products: cartDetails,
        userId: user._id,
        payMethod: payMethod,
      });
      console.log(res);
      if (res.data.success && payMethod === "cod") {
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

  async function displayRazorpay(e) {
    e.preventDefault();
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const result = await Axios.post("/orders/orderId", {
      amount: totalPrice,
    });

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    const { amount, id: order_id, currency } = result.data.order;

    const options = {
      key: "rzp_test_OFFIcNpSOaLOcU", // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "Janish Nehyan",
      description: order_id,
      image: "",
      order_id: order_id,
      handler: async function (response) {
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
          response,
        });
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const result = await Axios.post("/orders/payment-verify", data).catch(
          (err) => {
            console.log(err.response);
          }
        );
        if (result.data.success) {
          window.location.href = "/success-order";
        }
      },
      prefill: {
        name: "Janish Nehyan",
        email: "janishnehyan03@gmail.com",
        contact: "8086996655",
      },
      notes: {
        address: "Kondotty",
      },
      theme: {
        color: "#292252",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
  return (
    <div>
      {payMethod === "cod" ? (
        <button
          onClick={(e) => placeOrder(e)}
          className="w-full px-6 py-2 text-white  bg-blue-600  hover:bg-blue-900"
        >
          Place Order Now
        </button>
      ) : (
        <button
          onClick={(e) => displayRazorpay(e)}
          className="w-full px-6 py-2 text-white bg-green-400 hover:bg-blue-900"
        >
          Online Payment
        </button>
      )}
    </div>
  );
}

export default OrderBtn;
