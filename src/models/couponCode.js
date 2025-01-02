import mongoose from "mongoose";
export const couponCodeSchema = new mongoose.Schema(
  {
    couponCode: {
      type: String,
      required: [true, "couponCode is required!!"],
    },
    minAmount: {
      type: Number,
      required: [true, "minAmount is required!!"],
    },
    discount: {
      type: Number,
      required: [true, "discount is required!!"],
    },
    isActive:{
        type:Boolean,
        default:true
    }
  },
  { timestamps: true }
);

export default mongoose.model("couponCode", couponCodeSchema, "couponCode");
