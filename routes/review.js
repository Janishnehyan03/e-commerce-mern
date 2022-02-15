const router = require("express").Router();
const reviewController = require("../controllers/reviewController");
const authController = require("../controllers/authController");

router.route("/:productId").get(reviewController.getReviews);
router
  .route("/:id")
  .delete(authController.verifyToken, reviewController.deleteMyReview)
  .patch(authController.verifyToken, reviewController.updateReview)
  .get(reviewController.getReview)
  .post(authController.verifyToken, reviewController.writeReview);

router.route("/my-reviews").get(reviewController.getMyReviews);
router.get(
  "/check-review/:productId",
  authController.verifyToken,
  reviewController.checkAlreadyReviewed
);

module.exports = router;
