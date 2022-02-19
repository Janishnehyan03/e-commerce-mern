const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.googleSignup = async (req, res, next) => {
  try {
    let user = await User.findOne({ googleId: req.body.googleId });
    let token = await user.generateAuthToken();

    if (user) {
      await res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });
      res
        .status(200)
        // send cookies to client
        .json({
          message: "Login success",
          user: user,
          success: true,
          token: token,
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
      // send cookies to client
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });

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
