import { asyncHandler } from "../utils/asyncHandler.js";
import errorResponse from "../utils/errorResponse.js";
import products from "../models/products.js";

// @desc - new product
// @route - POST api/v1/product
export const newProduct = asyncHandler(async (req, res, next) => {
  const newDoc = new products({
    productImg: req?.files?.productImg[0],
    gallery: req?.files?.gallery,
    ...req?.body,
  });
  await newDoc.save();
  res
    .status(201)
    .json({ status: true, message: "Created successfully!!", newProduct });
});

// @desc - get all products
// @route - POST api/v1/product
export const getAllProducts = asyncHandler(async (req, res, next) => {
  const data = await products.find();
  res.status(200).json({ status: true, data });
});

// @desc - delete existing product
// @route - DELETE api/v1/product/:id
export const deleteProduct = asyncHandler(async (req, res, next) => {
  const isValidId = await products.findByIdAndDelete(req?.params?.id);
  if (!isValidId) return next(new errorResponse("No data found!!", 400));
  res.status(200).json({ status: true, message: "Deleted successfully!!" });
});

// @desc - update existing product
// @route - PATCH api/v1/product/:id
export const updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req?.params;
  const existingData = await products.findById(id);
  if (!existingData) return next(new errorResponse("No data found!!", 400));
  const data = await products.findByIdAndUpdate(id, {
    ...req?.body,
    gallery: req?.files?.gallery,
    productImg: req?.files?.productImg[0] || existingData?.productImg,
  });
  res
    .status(200)
    .json({ status: true, message: "Updated successfully!!", data });
});
