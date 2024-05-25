import booking from "../models/booking.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import errorResponse from "../utils/errorResponse.js";
import {razorpayInstance} from "../config/razorpay.js"


// @desc -creating new order section for razorpay and storing booking data in database
// @route - POST api/v1/booking/bookingOrder

export const bookingOrder = async (req, res, next) => {

  const newBooking = await booking.create({
    amount: req?.body?.amount,
  });
  
  const options = {
    amount: Number( req?.body?.amount * 100),
    currency: "INR",
  };
  console.log(Number(req?.body?.amount *100),"safd")
  
  razorpayInstance.orders
  .create(options)
  .then((order) => {
    res.status(200).json({
      success: true,
      order,
          bookingId: newBooking?._id,
        });
      })
      .catch(async (err) => {
        await booking.findByIdAndDelete(newBooking._id);
        return res.status(400).json({
          status: false,
          message: err?.message || err,
        });
      });
  };


  //Get all bookings

  
export const getAllBookings = async (req, res, next) => {

    const data  = await booking.findById();

    res.status(200).json({ status: true, data });

}

// @desc - verifying razorpay order api
// @route - POST api/v1/booking/verifyOrder

export const verifyOrder = asyncHandler(async (req, res) => {
    try {

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
        req.body;
      const body = razorpay_order_id + "|" + razorpay_payment_id;
      
      await booking.findByIdAndUpdate(req?.params?.id, {
        razorpay_order_id,
        isBookedSuccessfully: true,
        razorpay_payment_id,
      });
    
      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest("hex");
    
      const isAuthentic = expectedSignature === razorpay_signature;
    
      if (!isAuthentic) {
        await booking.findByIdAndDelete(req?.params?.id);
        res.redirect(`${process.env.FRONTEND_LIVE_URL}/paymentFailed/`);
      }

      res.status(200).json({
        status:true, message: "Payment verified successfully!!"
      })
        
    } catch (e) {
       
            return res
              .status(400)
              .json({ status: true, message: e?.message || "Internal server error" });
          
    }
   
   
    
  });