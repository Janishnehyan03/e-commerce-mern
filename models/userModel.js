const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      //  this is not editable
      type: String,
      required: true,
      select: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verifyToken: {
      type: String,
      default: null,
    },
    tokenExpriesIn: {
      type: Number,
      default: Date.now() + 60 * 60 * 1000,
    },
    resetToken: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// bcrypt function
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// compare password function
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

// generate token function
userSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_KEY, {
      expiresIn: "10d",
    });
    return token;
  } catch (error) {
    throw new Error(error);
  }
};

const User = mongoose.model("User", userSchema);
module.exports = User;
