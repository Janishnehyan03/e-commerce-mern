const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.googleSignup = async (req, res, next) => {
  try {
    let user = await User.findOne({ googleId: req.body.googleId });
    if (user) {
      res.status(200).json({
        message: "Login success",
        token: await user.generateAuthToken(),
        user: user,
        success: true,
      });
    } else {
      user = await User.create({
        googleId: req.body.googleId,
        username: req.body.name,
        email: req.body.email,
        isAdmin: false,
        isVerified: true,
        image: req.body.image,
      });
      let token = await user.generateAuthToken();
      res.status(200).json({
        message: "Login success",
        user: user,
        success: true,
        token: token,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Login failed",
      success: false,
    });
  }
};

exports.facebookSignup = async (req, res, next) => {
  try {
    let user = await User.findOne({ facebookId: req.body.facebookId });
    if (user) {
      res.status(200).json({
        message: "Login success",
        user: user,
        success: true,
      });
    } else {
      user = await User.create({
        facebookId: req.body.facebookId,
        username: req.body.name,
        email: req.body.email,
        isAdmin: false,
        isVerified: true,
        image: req.body.image,
      });
      res.status(200).json({
        message: "Login success",
        user: user,
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Login failed",
      success: false,
    });
  }
};