import { asyncHandler } from "../../utils/asyncHandler.js";
import errorResponse from "../../utils/errorResponse.js";
import enquirySubject from "../../models/enquiryRequest/enquirySubject.js";

// @desc - new enquiry subject
// @route - POST api/v1/subject
export const newEnquirySubject = asyncHandler(async (req, res, next) => {
  const newSubject = new enquirySubject(req?.body);
  await newSubject.save();
  res
    .status(201)
    .json({ status: true, message: "subject created successfully!!" });
});

// @desc - get all enquiry subject
// @route - GET api/v1/enquiry/subject
export const getAllSubjects = asyncHandler(async (req, res, next) => {
  const data = await enquirySubject.find();
  res.status(200).json({
    status: true,
    message: data?.length >= 1 ? "Data found successfully!" : "No data found!!",
    data,
  });
});

// @desc - delete enquiry subject
// @route - DELETE api/v1/subject/:id
export const deleteSubject = asyncHandler(async (req, res, next) => {
  const isValidId = await enquirySubject.findByIdAndDelete(req?.params?.id);
  if (!isValidId)
    return next(new errorResponse("No data found with given id!!", 400));
  res.status(200).json({ status: true, message: "Deleted successfully!!" });
});

// @desc - update enquiry subject
// @route - PATCH api/v1/subject/:id
export const updateSubject = asyncHandler(async (req, res, next) => {
  const isValidId = await enquirySubject.findByIdAndUpdate(
    req?.params?.id,
    req?.body
  );
  if (!isValidId)
    return next(new errorResponse("No data found with given id!!", 400));
  res.status(200).json({ status: true, message: "Updated successfully!!" });
});
