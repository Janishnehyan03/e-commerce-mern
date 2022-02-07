import React, { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { useHistory } from "react-router-dom";

function PayBtn() {
  const [stripeToken, setStripeToken] = useState(null);
  const history = useHistory();

  const publishableKey =
    "pk_test_51JZZ7eSAxKBwoS4hffwoy2M638J4YZNlp8UbwOsNCp0o9S29l4ulhXRVckqnxg0NFoKYNWz54JYWjeVllfcwBIfr00rtQbnFaT";
  const onToken = (token) => {
    setStripeToken(token);
  };
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const response = await axios.post("http://localhost:5000/api/payment", {
          tokenId: stripeToken.id,
          amount: 2000,
        });
        console.log(response.data);
        history.push("/success");
      } catch (error) {
        console.log(error);
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken, history]);
  return (
    <>
      {stripeToken ? (
        <h1 style={{ position: "absolute", top: "50%", left: "50%" }}>
          processing payment ....{" "}
        </h1>
      ) : (
        <StripeCheckout
          name="Natours"
          image="https://www.vidhub.co/assets/logos/vidhub-icon-2e5c629f64ced5598a56387d4e3d0c7c.png"
          billingAddress
          shippingAddress
          description="your total is $100"
          amount={100}
          panelLabel="Pay Now"
          token={onToken}
          stripeKey={publishableKey}
          currency="INR"
          customer="my customer id"
        >
          {/* create a payment button with style */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            className="payment-button"
          >
            <button
              style={{
                background: "black",
                color: "white",
                padding: "20px",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
              }}
              className="btn btn-primary"
            >
              Pay Now
            </button>
          </div>
        </StripeCheckout>
      )}
    </>
  );
}

export default PayBtn;
