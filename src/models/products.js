import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, "product name is required!!"],
    },
    productImg: {
      type: {},
      required: [true, "Product image is required!!"],
    },
    price: {
      type: Number,
      required: [true, "Price is required!!"],
    },
    discount: {
      type: Number,
      
    },
    totalPrice: {
      type: Number,
      virtual: true,
      
    },

    gallery: {
      type: [],
    },
    about: {
      type: [String],
      required: [true, "About section is required!!"],
    },

    description: {
      type: String,
      required: [true, "Description is required!!"],
    },
  },
  { timestamps: true }
);

productSchema.methods.calculateTotalPrice = function() {
  return Math.round(this.price * (1 - this.discount / 100));
};
export default mongoose.model("product", productSchema);
