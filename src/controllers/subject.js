import { asyncHandler } from "../utils/asyncHandler.js";
import errorResponse from "../utils/errorResponse.js";
import subject from "../models/subject.js";

// @desc - new subject category
// @route - POST api/v1/subject
export const newSubject = asyncHandler(async (req, res, next) => {
  const newDoc = new subject(req?.body);
  let data = await newDoc.save();
  res
    .status(201)
    .json({ status: true, message: "subject created successfully!!", data });
});

// @desc - get all subjects
// @route - GET api/v1/subject
export const getAllSubjects = asyncHandler(async (req, res, next) => {
  const data = await subject.find();
  res.status(200).json({
    status: true,
    message: data?.length >= 1 ? "Data found successfully!" : "No data found!!",
    data,
  });
});

export const getAllDeleteOrder = asyncHandler(async (req, res, next) => {
  const data = await subject.findByIdAndUpdate;
});
// @desc - delete subject
// @route - DELETE api/v1/subject/:id
export const deleteSubject = asyncHandler(async (req, res, next) => {
  const isValidId = await subject.findByIdAndDelete(req?.params?.id);
  if (!isValidId)
    return next(new errorResponse("No data found with given id!!", 400));
  res.status(200).json({ status: true, message: "Deleted successfully!!" });
});

// @desc - update subject
// @route - PATCH api/v1/subject/:id
export const updateSubject = asyncHandler(async (req, res, next) => {
  const isValidId = await subject.findByIdAndUpdate(req?.params?.id, req?.body);
  if (!isValidId)
    return next(new errorResponse("No data found with given id!!", 400));
  res.status(200).json({ status: true, message: "Updated successfully!!" });
});
