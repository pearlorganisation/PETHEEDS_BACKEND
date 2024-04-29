import { asyncHandler } from "../utils/asyncHandler.js";
import errorResponse from "../utils/errorResponse.js";
import brand from "../models/brand.js";

// @desc - new brand category
// @route - POST api/v1/brand
export const newBrand = asyncHandler(async (req, res, next) => {
  const newDoc = new brand({
    ...req?.body,
    brandBanner: req?.files?.brandBanner[0],
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
    const existingData = await brand.findById(req?.params?.id)
  const isValidId = await brand.findByIdAndUpdate(req?.params?.id, { ...req?.body,
    brandBanner: (Array.isArray(req?.files?.brandBanner) && req?.files?.brandBanner[0]) || existingData?.brandBanner

});
  if (!isValidId)
    return next(new errorResponse("No data found with given id!!", 400));
  res.status(200).json({ status: true, message: "Updated successfully!!" });
});
