import { asyncHandler } from "../utils/asyncHandler.js";
import errorResponse from "../utils/errorResponse.js";
import address from "../models/address.js";


// @desc - new address 
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

// @desc - get address 
// @route - GET api/v1/address
export const getAllAddresses = asyncHandler(async (req, res, next) => {

const data = await address.find()
  res
    .status(200)
    .json({ status: true, message: "Addresses data found successfully!!", data });
});