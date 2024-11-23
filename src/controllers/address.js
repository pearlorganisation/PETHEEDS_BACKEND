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

// @desc - Update address 
// @route - PATCH api/v1/address
export const updateAddress = asyncHandler(async (req, res, next) => {

  const {id} =req?.params

  const isValidId = await address.findByIdAndUpdate(id,req?.body);
 if(!isValidId){
  return next ( new errorResponse("Id is not valid to update the address",400))
 }
  res
    .status(200)
    .json({ status: true, message: "Address updated successfully!!" });
});

// @desc - Delete address 
// @route - DELETE api/v1/address
export const deleteAddress = asyncHandler(async (req, res, next) => {

  const {id} =req?.params

  const isValidId = await address.findByIdAndUpdate(id,{
    isActive:false
  });
 if(!isValidId){
  return next ( new errorResponse("Id is not valid to delete the address",400))
 }
  res
    .status(200)
    .json({ status: true, message: "Address Deleted successfully!!" });
});

// @desc - get address 
// @route - GET api/v1/address
export const getAllAddresses = asyncHandler(async (req, res, next) => {

const data = await address.find()
  res
    .status(200)
    .json({ status: true, message: "Addresses data found successfully!!", data });
});

//Get Particular User adderess

export const getParticularUserAddress= asyncHandler(async(req,res,next)=>{
   
  const {id} = req?.params
  
    const data = await address.find({userId:id,isActive:true});
  
    if (!data)
      return next(new errorResponse("No data found with given id!!"));
  
    res.status(200).json({status:true, message: data?.length >= 1 ? "Data found successfully!" : "No data found!!", data})
  
  })