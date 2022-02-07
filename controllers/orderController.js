const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

exports.getAllOrders = async (req, res) => {
  try {
    let orders = await order.find();
    res.status(200).json({
      message: "orders fetched successfully",
      results: orders.length,
      orders,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

exports.createOrder = async (req, res) => {
  try {
    //  create order from cart
    const order = await Order.create({
      ...req.body,
      status: req.body.payMethod === "cod" ? "placed" : "pending",
      userId: req.user._id,
    });
    await Cart.deleteOne({ userId: req.user._id });
    // decrease product stock after order is placed successfully
    const products = await Product.find({
      _id: { $in: order.products },
    });
    products.forEach(async (product) => {
      product.stock = product.stock - 1;
      await product.save();
    });

    res.status(200).json({
      message: "Order created successfully",
      order,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Order creation failed",
      error,
    });
  }
};

// get my orders
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.aggregate([
      { $match: { userId: req.user._id } },
      { $unwind: "$products" },
      {
        $lookup: {
          from: "products",
          localField: "products.productId",
          foreignField: "_id",
          as: "product",
        },
      },
    ]).sort({ createdAt: -1 });
    res.status(200).json({
      message: "Orders fetched successfully",
      results: orders.length,
      orders,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

exports.placeOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    order.status = "placed";
    const updatedOrder = await order.save();
    res.status(200).json({
      message: "Order placed successfully",
      updatedOrder,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};
