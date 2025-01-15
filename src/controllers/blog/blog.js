import { cloudinary } from "../../config/cloudinary.js";
import blog from "../../models/blog/blog.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import errorResponse from "../../utils/errorResponse.js";

// @desc - new blog
// @route - POST api/v1/blog
export const newBlog = asyncHandler(async (req, res, next) => {
  const banner = req?.file;
  // console.log(banner);
  const result = await cloudinary.uploader.upload(banner?.path);
  // console.log(result);
  const newDoc = new blog({
    ...req?.body,
    banner: result?.secure_url,
  });
  const data = await newDoc.save();
  res.status(201).json({ status: "true", message: "Created successfully!!" });
});

// @desc - get all blogs
// @route - get api/v1/blogs
export const getAllBlog = asyncHandler(async (req, res, next) => {
  const data = await blog.find();
  // .populate("createdBy", ["username", "_id"])
  // .populate("comments.createdBy", ["username", "_id"])
  // .populate("category", ["category", "_id"]);
  // console.log("hello");
  res.status(200).json({
    status: true,
    message:
      data?.length >= 1 ? "Data found successfully!!" : "No data found!!",
    data,
  });
});

// @desc - delete existing blog
// @route - DELETE api/v1/blog/:id

export const deleteBlog = async (req, res) => {
  try {
    const isValidId = await blog.findByIdAndDelete(req?.params?.id);
    if (!isValidId) {
      return res.status(404).json({ status: false, message: "Blog not found" });
    }
    res.status(200).json({ status: true, message: "Deleted successfully!!" });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error?.message || "Internal server error",
    });
  }
};

export const updateBlog = async (req, res) => {
  const banner = req?.file;
  console.log(req.body);
  let result;
  if (banner) {
    result = await cloudinary.uploader.upload(banner?.path);
  }

  try {
    const { id } = req?.params;
    const existingData = await blog.findById(id);
    const isValidId = await blog.findByIdAndUpdate(id, {
      ...req?.body,
      banner: result?.secure_url || existingData?.banner,
    });
    if (!isValidId) {
      return res.status(404).json({ status: false, message: "Blog not found" });
    }
    res.status(200).json({ status: true, message: "Updated successfully!!" });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error?.message || "Internal server error",
    });
  }
};

// @desc - get blog by slug
// @route - GET api/v1/blog/:slug

export const getBlogBySlug = async (req, res) => {
  const { slug } = req?.params;
  try {
    const singleBlog = await blog.findOne({ blogSlug: slug });
    if (!singleBlog) {
      return res.status(404).json({ status: false, message: "Blog not found" });
    }
    res
      .status(200)
      .json({ status: true, message: "Success!!", data: singleBlog });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error?.message || "Internal server error",
    });
  }
};
