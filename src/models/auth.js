import mongoose from "mongoose";

export const authSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required!!"],

      unique: [true, "This username is not available!!"],
    },
    email: {
      type: String,
      required: [true, "Email is required!!"],
      unique: [true, "Email already exists!!"],
    },
    role: {
      type: String,
      enum: ["Admin", "User"],
      default: "User",
    },
    password: {
      type: String,
      required: [true, "password is required!!"],
    },
    phoneNumber: {
      type: Number,
      //   required: [true, "Number already exists!!"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("auth", authSchema, "auth");
