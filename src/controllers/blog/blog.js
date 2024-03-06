import blog from "../../models/blog/blog.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import errorResponse from "../../utils/errorResponse.js";

// @desc - new blog
// @route - POST api/v1/blog
export const newBlog = asyncHandler(async (req, res, next) => {
  const newDoc = new blog({ ...req?.body, createdBy: req?.userId });
  const data = await newDoc.save();
  res.status(201).json({ status: 201, message: "Created successfully!!" });
});

// @desc - get all blogs
// @route - get api/v1/blogs
export const getAllBlog = asyncHandler(async (req, res, next) => {
  const data = await blog
    .find()
    .populate("createdBy", ["username", "_id"])
    .populate("comments.createdBy", ["username", "_id"])
    .populate("category", ["category", "_id"]);

  res.status(200).json({
    status: true,
    message:
      data?.length >= 1 ? "Data found successfully!!" : "No data found!!",
    data,
  });
});
