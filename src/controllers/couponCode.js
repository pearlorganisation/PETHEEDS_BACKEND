import { asyncHandler } from "../utils/asyncHandler.js";
import errorResponse from "../utils/errorResponse.js";
import couponCode from "../models/couponCode.js";

// @desc - new couponCode category
// @route - POST api/v1/couponCode
export const newCouponCode = asyncHandler(async (req, res, next) => {
  const newDoc = new couponCode(req?.body);
  let data = await newDoc.save();
  res
    .status(201)
    .json({ status: true, message: "couponCode created successfully!!" });
});

// @desc - get all couponCodes
// @route - GET api/v1/couponCode
export const getAllCouponCodes = asyncHandler(async (req, res, next) => {
  const data = await couponCode.find({isActive:true}).sort({createdAt:-1});
  res.status(200).json({
    status: true,
    message: data?.length >= 1 ? "Data found successfully!" : "No data found!!",
    data,
  });
});


// @desc - update couponCode
// @route - PATCH api/v1/couponCode/:id
export const updateCouponCode = asyncHandler(async (req, res, next) => {
  const isValidId = await couponCode.findByIdAndUpdate(req?.params?.id, {isActive:false});
  if (!isValidId)
    return next(new errorResponse("No data found with given id!!", 400));
  res.status(200).json({ status: true, message: "Disabled successfully!!" });
});
