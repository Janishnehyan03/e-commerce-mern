const Product = require("../models/productModel");
const User = require("../models/userModel");
const ObjectId = require("mongoose").Types.ObjectId;

exports.getAllProducts = async (req, res) => {
  try {
    let query = req.query;
    let products = await Product.find().populate("category");
    let data = await Product.find({ category: new ObjectId(query.category) });
    if (query.lt) {
      query.price = { $lt: query.lt };
      delete query.lt;
    } else if (query.gt) {
      query.price = { $gt: query.gt };
      delete query.gt;
    } else if (query.category) {
      products = await Product.find({
        category: ObjectId(query.category),
        deleted: false,
      });
    } else if (query.sort) {
      products = await Product.find(query).sort(query.sort);
    } else if (query.price) {
      products = await Product.find(query).sort({ price: 1 });
    } else if (query.limit) {
      products = await Product.find(query).limit(query.limit);
    } else if (query.lowtoHigh) {
      products = await Product.find(query).sort({ price: 1 });
    } else if (query.hightoLow) {
      products = await Product.find(query).sort({ price: -1 });
    } else if (query.mostOrdered) {
      products = await Product.find(query).sort({ stock: -1 });
    } else {
      query.sort = "-createdAt";
    }

    res.status(200).json({
      message: "products fetched successfully",
      results: products.length,
      products,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    res.status(200).json({
      message: "Product fetched successfully",
      product,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

exports.createNewProduct = async (req, res) => {
  const { title, description, price, category, img, stock } = req.body;
  if (!title || !description || !price || !category || !img || !stock) {
    return res.status(400).json({
      message: "Please enter all fields",
    });
  }
  try {
    let product = await Product.create(req.body);
    res.status(200).json({
      message: "Product created successfully",
      product,
      status: "success",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    let product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    let product = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Product deleted successfully",
      product,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

exports.searchProduct = async (req, res) => {
  try {
    let userData = JSON.parse(req.body.user);
    // add search to searchHistory of user
    if (userData) {
      const user = await User.findOne({ email: userData.email });

      user.searchHistory.push({
        search: req.body.search,
      });
      await user.save();
    }
    let products = await Product.find({
      title: { $regex: req.query.search, $options: "i" },
      deleted: false,
    });
    res.status(200).json({
      message: "Products fetched successfully",
      results: products.length,
      products,
      success: true,
      search: req.query.search,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error,
    });
  }
};
