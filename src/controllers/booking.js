import booking from "../models/booking.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import errorResponse from "../utils/errorResponse.js";
import { razorpayInstance } from "../config/razorpay.js";
import crypto from "crypto";
import { sendOrderMail } from "../utils/sendOrderMail.js";

// @desc -creating new order section for razorpay and storing booking data in database
// @route - POST api/v1/booking/bookingOrder

export const bookingOrder = asyncHandler(async (req, res, next) => {
  const newBooking = await booking.create({
    amount: req?.body?.amount,
    product: req?.body?.product,
    orderById: req?.body?.orderById,
    email: req?.body?.email,
    paymentType: "Online Paid",
    address: req?.body?.address,
  });
console.log(req?.body)
  const options = {
    amount: Number(req?.body?.amount * 100),
    currency: "INR",
  };

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
});

//Get all bookings

export const getAllBookings = asyncHandler(async (req, res, next) => {

 const bookingData = await booking
    .find()
    .populate("product.productId")
    .populate("orderById").populate("address")

  await booking.deleteMany({ isBookedSuccessfully: false });

  res.status(200).json({ status: true,message: bookingData?.length >= 1 ? "Data found successfully!" : "No data found!!", bookingData });
});

//Get Particular User bookings

export const getParticularUserBookings= asyncHandler(async(req,res,next)=>{
   
const {id} = req?.params

  const data = await booking.find({orderById:id}).populate("product.productId").populate("address")

  if (!data)
    return next(new errorResponse("No data found with given id!!"));

  res.status(200).json({status:true, message: data?.length >= 1 ? "Data found successfully!" : "No data found!!",data})

})

// @desc - verifying razorpay order api
// @route - POST api/v1/booking/verifyOrder

export const verifyOrder = asyncHandler(async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      await req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      await booking.findByIdAndDelete(req?.params?.id);
      return res.redirect(`${process.env.FRONTEND_LIVE_URL}/paymentFailed/`);
    }

    const updateBooking = await booking.findByIdAndUpdate(req?.params?.id, {
      razorpay_order_id,
      isBookedSuccessfully: true,
      razorpay_payment_id,
    });

    res.status(200).json({
      status: true,
      message: "Payment verified successfully!!",
      data: updateBooking,
    });
  } catch (e) {
    await booking.findByIdAndDelete(req?.params?.id);
    res
      .status(400)
      .json({ status: false, message: e?.message || "Internal server error" });
  }
});

// @create booking for CASH ON DELIVERY

export const createCodOrder = asyncHandler(async (req, res, next) => {
  try {
    const { amount, orderById, product, email,address } = req?.body;


    const newBooking = await booking.create({
      amount,
      orderById,
      address,
      product,
      email,
      isBookedSuccessfully: true,
    });

    res.status(201).json({
      status: true,
      message: "New Order created successfully!!",
      data: newBooking,
    });
  } catch (error) {
    await booking.findByIdAndDelete(_id);
    res.status(400).json({
      status: false,
      message: error?.message || "Internal server Error",
    });
  }
});
