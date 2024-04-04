import { asyncHandler } from "../utils/asyncHandler.js";
import errorResponse from "../utils/errorResponse.js";
import banner from "../models/banner.js";

export const newBanner = asyncHandler(async (req, res, next) => {
  const bannerData = new banner({ banner: req?.file?.path });
  await bannerData.save();

  res
    .status(201)
    .json({ status: true, message: "New banner created successfully!!" });
});

export const getAllBanner = asyncHandler(async (req, res, next) => {
  const data = await banner.find();
  res.status(200).json({ status: true, data });
});

export const deleteBanner = asyncHandler(async (req, res, next) => {
  const isValidId = await banner.findByIdAndDelete(req?.params?.id);
  if (!isValidId)
    return next(new errorResponse("No data found with given id!!"));
  res.status(200).json({ status: true, message: "Deleted successfully!!" });
});
