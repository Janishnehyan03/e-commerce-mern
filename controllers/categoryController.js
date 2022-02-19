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
    const categories = await Category.find(req.query);
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

exports.getCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    res.status(200).json({
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
exports.deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({
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

exports.updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
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
