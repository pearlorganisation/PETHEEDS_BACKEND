import { asyncHandler } from "../utils/asyncHandler.js";
import errorResponse from "../utils/errorResponse.js";
import review from "../models/review.js";
import { cloudinary } from "../config/cloudinary.js";

// @desc - new review category
// @route - POST api/v1/review
export const newReview = asyncHandler(async (req, res, next) => {

  const photo = req?.file;

  if(photo)
    { var photoResult = await cloudinary.uploader.upload(
      photo?.path
    );}

  const newDoc = new review({...req?.body,
    photo: photoResult?.secure_url,
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
        totalImages: { $sum: { $cond: [{ $ifNull: ["$photo", false] }, 1, 0] } }, // Count the number of documents with a photo
        totalReviews: { $sum: { $cond: [{ $ifNull: ["$message", false] }, 1, 0] } } // Count the number of documents with a review
      }
    },
    {
      $lookup: {
        from: "products", // The collection name for products
        localField: "_id",
        foreignField: "_id",
        as: "productDetails"
      }
    },
    {
      $unwind: "$productDetails" // Unwind the resulting array to include product details as an object
    },
    {
      $project:{
      "productDetails._id":0,
      "productDetails.productImg":0,
      "productDetails.productBanner":0,
      "productDetails.price":0,
      "productDetails.discount":0,
      "productDetails.newInStore":0,
      "productDetails.brand":0,
      "productDetails.category":0,
      "productDetails.about":0,
      "productDetails.description":0,
      "productDetails.createdAt":0,
      "productDetails.updatedAt":0,
      "productDetails.__v":0,
      "productDetails.gallery":0
      }
    }
  ]);

  res.status(200).json({
    status: true,
    message: data?.length >= 1 ? "Data found successfully!" : "No data found!!",
    data,
  });
});


export const getParticularProductReviews = asyncHandler(async (req, res, next) => {

  const data = await review.find();
  res.status(200).json({
    status: true,
    message: data?.length >= 1 ? "Data found successfully!" : "No data found!!",
    data,
  });
});

export const deleteReview = asyncHandler(async (req, res, next) => {
  const { id}=  req?.params

  const data = await review.findByIdAndDelete(id);

  if(!data){
    return next ( new errorResponse("Id is not valid to delete the Review",400))
 }
  
  
  res.status(200).json({
    status: true,
    message:  "Review Deleted successfully" 
  });
});


