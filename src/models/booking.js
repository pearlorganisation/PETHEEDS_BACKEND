import mongoose from "mongoose";


const bookingSchema = new mongoose.Schema({
  amount: {
    type: String,
    required: true,
  },
  orderById: {
    type: mongoose.Types.ObjectId,
    required: [true, "order by is required field!!"],
    ref: "auth",
  },
  email:{
    type:String,
    required:[true,"Email required "]
  },
paymentType:{
  type:String,
  enum:["Cash on Delivery","Online Paid"],
  required:true,
  default: "Cash on Delivery"
},

  productId: [
    { type: mongoose.Types.ObjectId, ref: 'product' }],

  isBookedSuccessfully: {
    type: Boolean,
    default: false,
  },

  razorpay_payment_id: {
    type: String,
  },
  razorpay_order_id: {
    type: String,
  },
},{timestamps:true});

export default mongoose.model("booking", bookingSchema);
