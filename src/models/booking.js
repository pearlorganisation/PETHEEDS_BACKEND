import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    bookingId: {
        type: mongoose.Types.ObjectId ,
      
      },
    amount:{
        type:String,
        required:true
    },
    isBookedSuccessfully: {
        type:Boolean,
        default: false,
    },

    razorpay_payment_id: {
        type: String,
      },
      razorpay_order_id: {
        type: String,
      },

});

export default mongoose.model("booking", bookingSchema);
