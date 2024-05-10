import { asyncHandler } from "../utils/asyncHandler.js";
import errorResponse from "../utils/errorResponse.js";
import Banner from "../models/banner.js";
import { cloudinary } from "../config/cloudinary.js";

export const newBanner = asyncHandler(async (req, res, next) => {

  const banner = req?.file;
  
  const result = await cloudinary.uploader.upload(banner?.path);

  const bannerData = new Banner({
    banner: result?.secure_url,
    ...req?.body,
  });
  await bannerData.save();

  res
    .status(201)
    .json({ status: true, message: "New banner created successfully!!" });
});

export const getAllBanner = asyncHandler(async (req, res, next) => {
  const data = await Banner.find();
  res.status(200).json({ status: true, data });
});

export const deleteBanner = asyncHandler(async (req, res, next) => {
  const isValidId = await Banner.findByIdAndDelete(req?.params?.id);
  if (!isValidId)
    return next(new errorResponse("No data found with given id!!"));
  res.status(200).json({ status: true, message: "Deleted successfully!!" });
});

export const updateBanner = asyncHandler(async (req, res, next) => {
  const  banner = req?.file;
 let result;

 if(banner){
   result = await cloudinary.uploader.upload(banner?.path);
}
  const { id } = req?.params;
  const existingData = await Banner.findById(id);
  const isValidId = await Banner.findByIdAndUpdate(id, {
    banner: result?.secure_url || existingData?.banner,
    ...req?.body,
  });
  if (!isValidId)
    return next(new errorResponse("No data found with given id!!"));
  res.status(200).json({ status: true, message: "Updated successfully!!" });
});
