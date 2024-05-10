import { asyncHandler } from "../utils/asyncHandler.js";
import errorResponse from "../utils/errorResponse.js";
import brand from "../models/brand.js";
import { cloudinary } from "../config/cloudinary.js";

// @desc - new brand category
// @route - POST api/v1/brand
export const newBrand = asyncHandler(async (req, res, next) => {
  const brandBanner = req?.file
  // console.log(brandBanner)
  let result;

  if(brandBanner){
    result= await cloudinary.uploader.upload(brandBanner?.path)
  }
  const newDoc = new brand({
    ...req?.body,
    brandBanner: result?.secure_url,
  });

  let data = await newDoc.save();
  res
    .status(201)
    .json({ status: true, message: "brand created successfully!!", data });
});

// @desc - get all brands
// @route - GET api/v1/brand
export const getAllBrands = asyncHandler(async (req, res, next) => {
  const data = await brand.find();
  res.status(200).json({
    status: true,
    message: data?.length >= 1 ? "Data found successfully!" : "No data found!!",
    data,
  });
});

export const getAllDeleteOrder = asyncHandler(async (req, res, next) => {
  const data = await brand.findByIdAndUpdate;
});
// @desc - delete brand
// @route - DELETE api/v1/brand/:id
export const deleteBrand = asyncHandler(async (req, res, next) => {
  const isValidId = await brand.findByIdAndDelete(req?.params?.id);
  if (!isValidId)
    return next(new errorResponse("No data found with given id!!", 400));
  res.status(200).json({ status: true, message: "Deleted successfully!!" });
});

// @desc - update brand
// @route - PATCH api/v1/brand/:id
export const updateBrand = asyncHandler(async (req, res, next) => {
  const brandBanner = req?.file
let result;
  if(brandBanner){
  result = await cloudinary.uploader.upload(brandBanner?.path)
  }

    const existingData = await brand.findById(req?.params?.id)
  const isValidId = await brand.findByIdAndUpdate(req?.params?.id, { ...req?.body,
    brandBanner: result?.secure_url || existingData?.brandBanner

});
  if (!isValidId)
    return next(new errorResponse("No data found with given id!!", 400));
  res.status(200).json({ status: true, message: "Updated successfully!!" });
});
