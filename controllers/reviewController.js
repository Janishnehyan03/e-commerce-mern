const Review = require("../models/reviewModel");

exports.checkAlreadyReviewed = async (req, res, next) => {
  const { productId } = req.params;
  const review = await Review.findOne({
    userId: req.user._id,
    productId: productId,
    deleted: false,
  });

  if (review) {
    res.status(200).json({
      message: "You have already reviewed this product",
      status: "already reviewed",
      review,
    });
  }
  next();
};
exports.writeReview = async (req, res, next) => {
  try {
    if (!req.body.review || !req.body.rating) {
      res.status(400).json({
        success: false,
        message: "Review and rating are required",
      });
    } else {
      let alreadyReviewed = await Review.find({
        productId: req.params.id,
        userId: req.user._id,
      });
      if (alreadyReviewed.length > 0) {
        console.log("already reviewed");
        res.status(400).json({
          success: false,
          message: "You have already reviewed this product",
        });
      } else {
        const review = await Review.create({
          productId: req.params.id,
          userId: req.user._id,
          review: req.body.review,
          rating: req.body.rating,
        });
        res.status(200).json({
          success: true,
          message: "Review created successfully",
          review: review,
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error creating review",
      error: err,
    });
  }
};

exports.getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({
      productId: req.params.productId,
    }).populate("userId");

    res.status(200).json({
      success: true,
      message: "Reviews fetched successfully",
      reviews: reviews,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching reviews",
      error: err,
    });
  }
};

exports.deleteMyReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (review.userId.toString() !== req.user._id.toString()) {
      res.status(401).json({
        success: false,
        message: "You are not authorized to delete this review",
      });
    } else {
      await review.remove();
      res.status(200).json({
        success: true,
        message: "Review deleted successfully",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error deleting review",
      error: err,
    });
  }
};

exports.updateReview = async (req, res, next) => {
  try {
    const review = await Review.findOneAndUpdate(
      { _id: req.params.reviewId },
      { review: req.body.review, rating: req.body.rating }
    );
    res.status(200).json({
      success: true,
      message: "Review updated successfully",
      review: review,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error updating review",
      error: err,
    });
  }
};

exports.getMyReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ userId: req.user._id });
    res.status(200).json({
      success: true,
      message: "Reviews fetched successfully",
      reviews: reviews,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching reviews",
      error: err,
    });
  }
};

exports.getReview = async (req, res, next) => {
  try {
    const review = await Review.findOne({
      _id: req.params.reviewId,
      deleted: false,
    });
    res.status(200).json({
      success: true,
      message: "Review fetched successfully",
      review: review,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching review",
      error: err,
    });
  }
};
