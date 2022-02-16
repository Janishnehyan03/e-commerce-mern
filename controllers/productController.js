const Product = require("../models/productModel");

exports.getAllProducts = async (req, res) => {
  try {
    let query = req.query;
    let products = await Product.find({ deleted: false });
    if (query.lt) {
      query.price = { $lt: query.lt };
      delete query.lt;
    } else if (query.gt) {
      query.price = { $gt: query.gt };
      delete query.gt;
    } else if (query.categories) {
      query.categories = { $in: query.categories };
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
  const { title, description, price, categories, img, stock } = req.body;
  if (!title || !description || !price || !categories || !img || !stock) {
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
    });
  } catch (error) {
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
    let product = await Product.findByIdAndUpdate(req.params.id, {
      deleted: true,
    });
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
