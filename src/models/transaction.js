import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    razorpay_payment_id: {
      type: String,
    },
    razorpay_order_id: {
      type: String,
    },
    razorpay_order_id: {
      type: String,
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "products",
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "auth",
    },
  },
  { timestamps: true }
);

export default mongoose.model("transaction", transactionSchema, "transaction");
