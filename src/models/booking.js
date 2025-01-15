import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    amount: {
      type: String,
      required: true,
    },
    discount: {
      type: String,
      required: true,
    },
    orderById: {
      type: mongoose.Types.ObjectId,
      required: [true, "order by is required field!!"],
      ref: "auth",
    },
    address:{
      type: mongoose.Types.ObjectId,
      required:[ true,"address is required!"],
      ref:'address'
    },
    email: {
      type: String,
      required: [true, "Email required "],
    },
    paymentType: {
      type: String,
      enum: ["Cash on Delivery", "Online Paid"],
      required: true,
      default: "Cash on Delivery",
    },

    product: [
      {
        type: Object,
        ref: "product",
        productId: mongoose.Types.ObjectId,
        price: Number,
        weight: String,
        totalItem: Number,
        rating: Object
      },
    ],

    isBookedSuccessfully: {
      type: Boolean,
      default: false,
    },
    orderStatus:{
      type: String,
      enum:["Pending","Completed","Cancelled"],
      default: "Pending",
    },
    razorpay_payment_id: {
      type: String,
    },
    razorpay_order_id: {
      type: String,
    },
    rating: {
      type:{},
    },
  },
  { timestamps: true }
);

export default mongoose.model("booking", bookingSchema);
