const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const productRoutes = require("./routes/product.js");
const userRoutes = require("./routes/user.js");
const orderRoutes = require("./routes/order.js");
const cartRoutes = require("./routes/cart.js");
const authRoutes = require("./routes/auth.js");
const paymentRoutes = require("./routes/payment.js");
const adminRoutes = require("./routes/admin.js");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser");

dotenv.config();
app.use(morgan("dev"));
app.use(cookieParser());
// database connection
mongoose.connect(process.env.MONGO_URI, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connected to database");
  }
});
// middlewares
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(bodyParser.json());
// routes
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/carts", cartRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/admin", adminRoutes);
// send react app
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", function (req, res) {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(process.env.PORT || 5000, () => {
  console.log("Server started at port 5000");
});
