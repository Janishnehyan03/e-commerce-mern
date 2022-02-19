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
const adminRoutes = require("./routes/admin.js");
const reviewRoutes = require("./routes/review.js");
const categoryRoutes = require("./routes/category.js");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser");

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

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

app.use(bodyParser.json());
// console production or development
console.log(app.get("env"));

// setup view page for pug
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// routes
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/carts", cartRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/reviews", reviewRoutes);
app.use("/api/v1/categories", categoryRoutes);

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

module.exports = app;
