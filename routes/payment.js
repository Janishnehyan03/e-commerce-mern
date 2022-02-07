const router = require("express").Router();
const dotenv = require("dotenv");

dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/", async (req, res) => {
  try {
    let stripeResponse =await stripe.charges.create({
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "INR", // indian currency
    });
    // console.log(stripeResponse);
    res.status(200).json({
      message: "payment successful",
      response: stripeResponse,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
});

module.exports = router;
