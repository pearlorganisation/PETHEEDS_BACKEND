import { asyncHandler } from "../../utils/asyncHandler.js";
import errorResponse from "../../utils/errorResponse.js";
import blogCategory from "../../models/blog/blogCategory.js";

// @desc - new blog category
// @route - POST api/v1/blogCategory
export const newBlogCategory = asyncHandler(async (req, res, next) => {
  const newCategory = new blogCategory(req?.body);
  await newCategory.save();
  res
    .status(201)
    .json({ status: true, message: "category created successfully!!" });
});

// @desc - get all blog category
// @route - GET api/v1/blogCategory
export const getAllBlogCategories = asyncHandler(async (req, res, next) => {
  const data = await blogCategory.find();
  res.status(200).json({
    status: true,
    message: data?.length >= 1 ? "Data found successfully!" : "No data found!!",
    data,
  });
});

// @desc - delete blog category
// @route - DELETE api/v1/blogCategory/:id
export const deleteBlogCategory = asyncHandler(async (req, res, next) => {
  const isValidId = await blogCategory.findByIdAndDelete(req?.params?.id);
  if (!isValidId)
    return next(new errorResponse("No data found with given id!!", 400));
  res.status(200).json({ status: true, message: "Deleted successfully!!" });
});

// @desc - update blog category
// @route - PATCH api/v1/blogCategory/:id
export const updateBlogCategory = asyncHandler(async (req, res, next) => {
  const isValidId = await blogCategory.findByIdAndUpdate(
    req?.params?.id,
    req?.body
  );
  if (!isValidId)
    return next(new errorResponse("No data found with given id!!", 400));
  res.status(200).json({ status: true, message: "Updated successfully!!" });
});
