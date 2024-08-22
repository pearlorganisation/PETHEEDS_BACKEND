import { asyncHandler } from "../../utils/asyncHandler.js";
import errorResponse from "../../utils/errorResponse.js";
import callbackRequest from "../../models/enquiryRequest/callbackRequest.js";

// @desc - new callback request
// @route - POST api/v1/callbackRequest
export const newCallBackRequest = asyncHandler(async (req, res, next) => {
  const newDoc = new callbackRequest(req?.body);
  const data = await newDoc.save();
  res
    .status(200)
    .json({ status: true, message: "Created succesfully!!", data });
});

// @desc - get all calllback
// @route - GET api/v1/callbackRequest
export const getAllCallbackRequests = asyncHandler(async (req, res) => {
  const data = await callbackRequest.find().sort({createdAt:-1})

  res.status(200).json({
    status: true,
    message:
      data?.length >= 1 ? "Data found successfully!!" : "No data found!!",
    data,
  });
});

// @desc - get all calllback
// @route - POST api/v1/callbackRequest
export const deleteCallbackRequest = asyncHandler(async (req, res) => {
  const isValidId = await callbackRequest.findByIdAndDelete(req?.params?.id);
  if (!isValidId)
    return next(new errorResponse("No data found with given id!!", 400));

  res.status(200).json({ status: true, message: "Deleted successfully!!" });
});
