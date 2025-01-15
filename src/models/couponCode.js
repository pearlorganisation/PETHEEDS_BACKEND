import mongoose from "mongoose";
export const couponCodeSchema = new mongoose.Schema(
  {
    couponCode: {
      type: String,
      required: [true, "couponCode is required!!"],
      unique: true
    },
    minAmount: {
      type: Number,
      required: [true, "minAmount is required!!"],
    },
    discount: {
      type: Number,
      required: [true, "discount is required!!"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("couponCode", couponCodeSchema, "couponCode");
