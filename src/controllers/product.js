import { asyncHandler } from "../utils/asyncHandler.js";
import errorResponse from "../utils/errorResponse.js";
import products from "../models/products.js";
import { cloudinary } from "../config/cloudinary.js";
import mongoose from "mongoose";

// @desc - new product
// @route - POST api/v1/product
export const newProduct = asyncHandler(async (req, res, next) => {
  const { productImg, gallery, productBanner } = req?.files;
  // Upload files to Cloudinary
  const productImgResult = await cloudinary.uploader.upload(productImg[0].path);
  if (productBanner) {
    var productBannerResult = await cloudinary.uploader.upload(
      productBanner[0].path
    );
  }

  const galleryResults = await Promise.all(
    gallery.map((file) => cloudinary.uploader.upload(file.path))
  );

  const { price, ...rest } = req?.body;
  const newDoc = new products({
    productImg: productImgResult?.secure_url,
    gallery: galleryResults.map((result) => result.secure_url),
    productBanner: productBannerResult?.secure_url,
    price: JSON.parse(price),
    ...rest,
  });
  newDoc.price = newDoc.calculateTotalPrice();

  await newDoc.save();
  res.status(201).json({ status: true, message: "Created successfully!!" });
});

// @desc - get all products
// @route - POST api/v1/product
export const getAllProducts = asyncHandler(async (req, res, next) => {
  const excludeFields = ["sort", "page", "limit", "fields"];

  const queryObj = { ...req.query };

  excludeFields.forEach((el) => {
    delete queryObj[el];
  });

  // Filter out empty query parameters
  Object.keys(queryObj).forEach((key) => {
    if (queryObj[key] === "") {
      delete queryObj[key];
    } else if (key === "category" || key === "brand") {
      queryObj[key] = new mongoose.Types.ObjectId(queryObj[key]);
    } else if (key === "newInStore") {
      queryObj[key] = Boolean(queryObj[key]);
    } else if (key === "productName") {
      queryObj[key] = new RegExp(`^${queryObj[key]}`, "i");
    }
  });

  // console.log(queryObj)

  // pagination
  const dataCount = await products.countDocuments(queryObj);

  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || dataCount || 1;
  const sort = req?.query?.sort;
  let finalSort = {};

  // Define sorting logic
  if (sort == -1) {
    finalSort = { "price.0.totalPrice": -1 }; // Sort by totalPrice descending
  } else if (sort == 1) {
    finalSort = { "price.0.totalPrice": 1 }; // Sort by totalPrice ascending
  } else if (sort === "better-discount") {
    finalSort = { discount: -1 }; // Sort by discount descending (if no pri                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          ce sort)
  } else {
    finalSort = { _id: 1 };
  }

  // Pagination logic
  const skip = (page - 1) * limit;

  console.log(queryObj);
  // Aggregate pipeline with dynamic sorting
  const data = await products.aggregate([
    { $match: queryObj },
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "category",
      },
    },
    {
      $lookup: {
        from: "brand",
        localField: "brand",
        foreignField: "_id",
        as: "brand",
      },
    },
    {
      $unwind: {
        path: "$category",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $unwind: {
        path: "$brand",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $sort: { ...finalSort }, // Apply dynamic sorting
    },
    { $skip: skip },
    { $limit: limit },
  ]);

  res.status(200).json({
    getStatus: true,
    length: data.length,
    data,
    totalPages: Math.ceil(dataCount / limit),
  });
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
  let { productImg, gallery, productBanner } = req?.files;
  let productImgResult;

  if (productImg) {
    productImgResult = await cloudinary.uploader.upload(
      Array.isArray(productImg) && productImg.length > 0
        ? productImg[0].path
        : ""
    );
  }

  let productBannerResult;
  if (productBanner) {
    productBannerResult = await cloudinary.uploader.upload(
      Array.isArray(productBanner) && productBanner.length > 0
        ? productBanner[0].path
        : ""
    );
  }

  if (gallery) {
    var galleryResults = await Promise.all(
      gallery?.map((file) => cloudinary.uploader.upload(file.path)) || []
    );
  }

  const { id } = req?.params;
  let { price, discount, ...rest } = req?.body;
  const existingData = await products.findById(id);
  if (!existingData) return next(new errorResponse("No data found!!", 400));

  price = JSON.parse(price);

  const updatedPrice = price.map((item) => ({
    ...item,
    totalPrice: Math.round(item?.price * (1 - (discount || 0) / 100)),
  }));

  const updatedData = {
    ...rest,
    discount,
    price: updatedPrice,
    gallery:
      (Array.isArray(galleryResults) &&
        galleryResults?.length > 0 &&
        galleryResults?.map((result) => result?.secure_url)) ||
      existingData?.gallery,
    productBanner:
      productBannerResult?.secure_url || existingData?.productBanner,
    productImg: productImgResult?.secure_url || existingData?.productImg,
  };

  // console.log(updatedData)
  await products.findByIdAndUpdate(id, updatedData);

  res.status(200).json({
    status: true,
    message: "Updated successfully!!",
    data: updatedData,
  });
});

// @desc - get particular product api
// @route - GET api/v1/product/:id
export const getParticularProduct = asyncHandler(async (req, res, next) => {
  const data = await products.findOne({ productSlug: req?.params?.id });
  res.status(200).json({ status: true, data });
});
