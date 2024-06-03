import { asyncHandler } from "../utils/asyncHandler.js";
import errorResponse from "../utils/errorResponse.js";
import address from "../models/address.js";


// @desc - new address category
// @route - POST api/v1/address
export const newAddress = asyncHandler(async (req, res, next) => {

  const newDoc = new address({
    ...req?.body,
  });

  let data = await newDoc.save();
  res
    .status(201)
    .json({ status: true, message: "Address created successfully!!", data });
});