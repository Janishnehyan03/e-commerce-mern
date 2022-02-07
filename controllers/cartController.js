const Cart = require("../models/cartModel");

exports.getAllCarts = async (req, res) => {
  try {
    let carts = await Cart.find();
    res.status(200).json({
      message: "Carts fetched successfully",
      results: carts.length,
      carts,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    if (cart) {
      const item = cart.products.find((item) => {
        return item.productId.toString() === req.params.id;
      });
      if (item) {
        item.quantity += 1;
      } else {
        cart.products.push({
          productId: req.params.id,
          quantity: 1,
        });
      }
      cart.save();
      res.status(200).json({
        message: "Cart updated successfully",
        cart,
      });
    } else {
      const newCart = new Cart({
        userId: req.user._id,
        products: [
          {
            productId: req.params.id,
            quantity: 1,
          },
        ],
      });
      await newCart.save();

      res.status(200).json({
        message: "Cart created successfully",
        cart: newCart,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error,
    });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user._id });
    cart.products = cart.products.filter((item) => {
      return item.productId.toString() !== req.params.id;
    });
    cart.save();
    res.status(200).json({
      message: "Cart updated successfully",
      cart,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error,
    });
  }
};

exports.changeQuantity = async (req, res) => {
  try {
    let cart = await Cart.updateOne(
      {
        userId: req.user._id,
        "products.productId": req.params.id,
      },
      {
        $inc: {
          "products.$.quantity": req.body.quantity,
        },
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      message: "Cart updated successfully",
      cart,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error,
    });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    cart.products = [];
    cart.save();
    res.status(200).json({
      message: "Cart cleared successfully",
      cart,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};
// aggregate products array in cart and fetch product details
exports.getCartDetails = async (req, res) => {
  try {
    let products = await Cart.aggregate([
      { $match: { userId: req.user && req.user._id } },
      {
        $unwind: "$products",
      },
      {
        $project: {
          productId: "$products.productId",
          quantity: "$products.quantity",
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "product",
        },
      },
      // get total price from product
      {
        $project: {
          productId: 1,
          quantity: 1,
          product: { $arrayElemAt: ["$product", 0] },
        },
      },
      {
        $addFields: {
          totalPrice: { $multiply: ["$product.price", "$quantity"] },
        },
      },
      {
        $group: {
          _id: "$productId",
          quantity: { $sum: "$quantity" },
          product: { $first: "$product" },
          totalPrice: { $sum: "$totalPrice" },
          productId: { $first: "$productId" },
        },
      },
    ]).sort({ _id: 1 });

    res.status(200).json({
      message: "Cart fetched successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error,
    });
  }
};

// get total price of cart
exports.getTotalPrice = async (req, res) => {
  try {
    let products = await Cart.aggregate([
      { $match: { userId: req.user._id } },
      {
        $unwind: "$products",
      },
      {
        $project: {
          productId: "$products.productId",
          quantity: "$products.quantity",
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "product",
        },
      },
    ]);

    let totalPrice = 0;
    products.forEach((product) => {
      totalPrice += product.product[0].price * product.quantity;
    });

    res.status(200).json({
      message: "Total price fetched successfully",
      totalPrice,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error,
    });
  }
};
