import mongoose from "mongoose";

export const authSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required!!"],
    },
    email: {
      type: String,
      required: [true, "Email is required!!"],

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
    Address: {
      type: Number,
      //   required: [true, "Number already exists!!"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("auth", authSchema, "auth");
