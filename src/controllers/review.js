import { asyncHandler } from "../utils/asyncHandler.js";
import errorResponse from "../utils/errorResponse.js";
import review from "../models/review.js";
import { cloudinary } from "../config/cloudinary.js";
import booking from "../models/booking.js";

// @desc - new review category
// @route - POST api/v1/review
export const newReview = asyncHandler(async (req, res, next) => {

  const { rating, message, orderId, product } = req?.body;
  let { productData } = req?.body;
  productData = JSON.parse(productData);

  const reviewImages = req?.files;
  if (reviewImages) {
    var reviewImagesResult = await Promise.all(
      reviewImages.map((file) => cloudinary.uploader.upload(file.path))
    );
  }

  const newDoc = new review({
    ...req?.body,
    reviewImages: reviewImagesResult.map((result) => result.secure_url),
  });

  const bookingData = await booking.findById(orderId).lean();

  const productOrderField = bookingData.product.map((item, idx) => {
    return item?.productId === product
      ? {
          ...item,
          rating: {
            rating: rating,
            message: message,
            reviewImages: reviewImagesResult.map((result) => result.secure_url),
          },
        }
      : { ...item };
  });

  await booking.updateOne(
    { _id: orderId },
    { $set: { product: productOrderField } }
  );

  let data = await newDoc.save();
  res
    .status(201)
    .json({ status: true, message: "review created successfully!!", data });
});

export const adminGeneratedReview = asyncHandler(async (req, res, next) => {
  const reviewImages = req?.files;
  if (reviewImages) {
    var reviewImagesResult = await Promise.all(
      reviewImages.map((file) => cloudinary.uploader.upload(file.path))
    );
  }

  const newDoc = new review({
    ...req?.body,
    reviewImages: reviewImagesResult.map((result) => result.secure_url),
    isApproved: true,
    isAdmin: true,
  });

  let data = await newDoc.save();
  res
    .status(201)
    .json({ status: true, message: "review created successfully!!", data });
});

// @desc - get all reviews
// @route - GET api/v1/review
export const getReviewTotalProducts = asyncHandler(async (req, res, next) => {
  const data = await review.aggregate([
    {
      $group: {
        _id: "$product", // Group by the product field
        totalRatings: { $sum: 1 }, // Count the number of ratings
        totalImages: {
          $sum: { $cond: [{ $ifNull: ["$reviewImages", false] }, 1, 0] },
        }, // Count the number of documents with a photo
        totalReviews: {
          $sum: { $cond: [{ $ifNull: ["$message", false] }, 1, 0] },
        }, // Count the number of documents with a review
        totalIsAdmin: {
          $sum: { $cond: [{ $ifNull: ["$isAdmin", false] }, 1, 0] },
        }, // Count the number of documents with aadmin review
        latestReviewDate: { $max: "$createdAt" }, // Get the latest review date for each product
      },
    },
    {
      $lookup: {
        from: "products", // The collection name for products
        localField: "_id",
        foreignField: "_id",
        as: "productDetails",
      },
    },
    {
      $unwind: "$productDetails", // Unwind the resulting array to include product details as an object
    },
    {
      $project: {
        "productDetails._id": 0,
        "productDetails.productImg": 0,
        "productDetails.productBanner": 0,
        "productDetails.price": 0,
        "productDetails.discount": 0,
        "productDetails.newInStore": 0,
        "productDetails.brand": 0,
        "productDetails.category": 0,
        "productDetails.about": 0,
        "productDetails.description": 0,
        "productDetails.createdAt": 0,
        "productDetails.updatedAt": 0,
        "productDetails.__v": 0,
        "productDetails.gallery": 0,
        "productDetails.productSlug": 0,
      },
    },
    {
      $sort: { latestReviewDate: -1 }, // Sort by the latest review date in descending order
    },
  ]);

  res.status(200).json({
    status: true,
    message: data?.length >= 1 ? "Data found successfully!" : "No data found!!",
    data,
  });
});

export const getParticularProductReviews = asyncHandler(
  async (req, res, next) => {
    const { id } = req?.params;
    const isApproved = req?.query?.isApproved;

    const queryObj = { product: id, isApproved };
    // Filter out empty query parameters
    Object.keys(queryObj).forEach((key) => {
      if (queryObj[key] === undefined) {
        delete queryObj[key];
      }
    });
    console.log(queryObj);

    const data = await review.find(queryObj).sort({ createdAt: -1 });
    res.status(200).json({
      status: true,
      message:
        data?.length >= 1 ? "Data found successfully!" : "No data found!!",
      data,
    });
  }
);

export const deleteReview = asyncHandler(async (req, res, next) => {
  const { id } = req?.params;

  const data = await review.findByIdAndDelete(id);

  if (!data) {
    return next(new errorResponse("Id is not valid to delete the Review", 400));
  }

  res.status(200).json({
    status: true,
    message: "Review Deleted successfully",
  });
});

export const approvalProductReviews = asyncHandler(async (req, res, next) => {
  const { id } = req?.params;
  const { approval } = req?.body;

  const data = await review.findByIdAndUpdate(id, { isApproved: approval });
  if (!data) {
    return next(
      new errorResponse("Id is not valid to approve the review", 400)
    );
  }
  res.status(200).json({
    status: true,
    message: "Review approved successfully!",
  });
});
