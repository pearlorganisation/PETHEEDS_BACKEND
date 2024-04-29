import mongoose from "mongoose";
export const brandSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: [true, "brand is required!!"],
    },
    brandBanner: {
      type: {},
      required: [true, "brandbanner is required!!"]
    },
  },
  { timestamps: true }
);

export default mongoose.model("brand", brandSchema, "brand");
