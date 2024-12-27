import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      unique: true,
      required: [true, "product name is required!!"],
    },
    productSlug: {
      type: String,
      required: [true, "product slug is required!!"],
      unique: true,
      trim: true,
    },
    productImg: {
      type: {},
      required: [true, "Product image is required!!"],
    },
    productBanner: {
      type: {},
    },
    price: [
      {
        weight: {
          type: String,
        },
        price: {
          type: Number,
        },
        totalPrice: {
          type: Number,
        },
      },
    ],
    discount: {
      type: Number,
    },
    newInStore: {
      type: Boolean,
      default: false,
    },
    brand: {
      type: mongoose.Types.ObjectId,
      ref: "brand",
      required: [true, "Brand name is required!!"],
    },

    category: {
      type: mongoose.Types.ObjectId,
      ref: "category",
      required: true,
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

productSchema.methods.calculateTotalPrice = function () {
  // console.log(this,"this")
  return this.price.map((item) => {
    return {
      ...item,
      totalPrice: Math.round(item.price * (1 - (this.discount || 0) / 100)),
    };
  });
};
export default mongoose.model("product", productSchema);
