const Product = require("../models/productModel");
const Order = require("../models/orderModel");

exports.getMostSold = async (req, res) => {
  //   get most sold products from orders
  try {
    let products = await Order.aggregate([
      {
        $unwind: "$products",
      },
      {
        $group: {
          _id: "$products.productId",
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "_id",
            as: "product",
        }
      }
    ]);
    res.status(200).json({
      message: "Most sold products fetched successfully",
      results: products.length,
      products,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};
