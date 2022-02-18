const Category = require("../models/categoryModel");

exports.addNewCategory = async (req, res, next) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json({
      status: "success",
      category,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
      success: false,
    });
  }
};

exports.getAllCategories = async (req, res, next) => {
  try {
    let query = req.query;

    const categories = await Category.find(req.query)
    res.status(200).json({
      status: "success",
      categories,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
      success: false,
    });
  }
};
