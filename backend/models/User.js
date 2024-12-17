import mongoose from "mongoose";

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/server.config.js";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minLength: 3,
      maxLength: 30,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Not a valid email",
      ],
    },

    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      requried: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number.",
      ],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();

  const salt = await bcrypt.genSalt(10);

  const encryptedPassword = await bcrypt.hash(this.password, salt);

  this.password = encryptedPassword;

  next();
});

userSchema.methods.compare = async function (plainPassword) {
  const result = await bcrypt.compare(plainPassword, this.password);

  return result;
};

userSchema.methods.getJwtToken = function () {
  const token = jwt.sign({ userId: this._id }, JWT_SECRET, {
    expiresIn: "30d",
  });

  return token;
};

const User = mongoose.model("User", userSchema);

export default User;
