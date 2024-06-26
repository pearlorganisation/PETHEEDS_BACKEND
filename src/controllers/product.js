import { asyncHandler } from "../utils/asyncHandler.js";
import errorResponse from "../utils/errorResponse.js";
import products from "../models/products.js";
import { cloudinary } from "../config/cloudinary.js";

// @desc - new product
// @route - POST api/v1/product
export const newProduct = asyncHandler(async (req, res, next) => {
  const { productImg, gallery, productBanner } = req?.files;

  // Upload files to Cloudinary
  const productImgResult = await cloudinary.uploader.upload(productImg[0].path);
  const productBannerResult = await cloudinary.uploader.upload(
    productBanner[0].path
  );
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

  // console.log(queryObj)

  // pagination
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 0;

  // page 1 : 1-12; page 2 : 13-24; page 3 : 25-36
  const skip = (page - 1) * limit;

  if (req.query.page) {
    const dataCount = await products.countDocuments();

    if (skip >= dataCount) {
      return next(new errorResponse("No data found!!", 400));
    }
    const data = await products
      .find(queryObj)
      .populate("category")
      .populate("brand")
      .skip(skip)
      .limit(limit);
    res.status(200).json({
      getStatus: true,
      length: data.length,
      data,
      totalPages: Math.ceil(dataCount / limit),
    });
  } else {
    const data = await products
      .find(queryObj)
      .populate("category")
      .populate("brand");
    res.status(200).json({ getStatus: true, length: data.length, data });
  }
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
    productImgResult = await  cloudinary.uploader.upload(
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
  // console.log("2");
  const galleryResults = await Promise.all(
    gallery?.map((file) => cloudinary.uploader.upload(file.path)) || []
  );

  // console.log("3");
  const { id } = req?.params;
  const { price, ...rest } = req?.body;
  const existingData = await products.findById(id);
  // console.log(existingData, "hell.");
  if (!existingData) return next(new errorResponse("No data found!!", 400));
  const data = await products.findByIdAndUpdate(id, {
    ...rest,
    price: JSON.parse(price),
    gallery:
      Array.isArray(galleryResults) &&
      galleryResults?.length > 0 &&
      galleryResults?.map((result) => result?.secure_url) || existingData?.gallery,
    productBanner: productBannerResult?.secure_url || existingData?.productBanner,

    productImg: productImgResult?.secure_url || existingData?.productImg,
  });
 
  res
    .status(200)
    .json({ status: true, message: "Updated successfully!!", data });
});

// @desc - get particular product api
// @route - GET api/v1/product/:id
export const getParticularProduct = asyncHandler(async (req, res, next) => {
  const data = await products.findById(req?.params?.id);
  res.status(200).json({ status: true, data });
});
