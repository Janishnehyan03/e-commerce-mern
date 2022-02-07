import React from "react";

function Success() {
  return (
    <div>
      {/* create a payment success page with inline style */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* create a payment success text with light green button */}
        <div
          style={{
            background: "lightgreen",
            color: "white",
            padding: "20px",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
          }}
          className="btn btn-primary"
        >
          <h3 style={{ background: "" }}>Payment Successful</h3>
        </div>
      </div>
    </div>
  );
}

export default Success;
