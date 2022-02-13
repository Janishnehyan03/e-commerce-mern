const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    minlength: 1,
    maxlength: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});

// find reviews by productId withou deleted reviews
reviewSchema.pre(/^find/, function (next) {
  this.find({ deleted: false });
  next();
});
const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
