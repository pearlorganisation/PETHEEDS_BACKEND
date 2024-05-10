import { asyncHandler } from "../utils/asyncHandler.js";
import errorResponse from "../utils/errorResponse.js";
import category from "../models/category.js";
import { cloudinary } from "../config/cloudinary.js";

export const newCategory = asyncHandler(async(req,res,next)=>{
    const categoryImg = req?.file

    const result = await cloudinary.uploader.upload(categoryImg?.path)
 
    const categoryData =  new category({
        categoryImg: result?.secure_url,
        ...req?.body
    })
    await categoryData?.save();

    res.status(201).json({
        status:true,
        message:"New category created successfully"
    })
})

export const getAllCategory= asyncHandler(async(req,res,next)=>{

    const data = await category?.find();

    res.status(200).json({
        status:true,
        data
    })
})

export const deleteCategory = asyncHandler(async (req, res, next) => {
    const isValidId = await category.findByIdAndDelete(req?.params?.id);
    if (!isValidId)
      return next(new errorResponse("No data found with given id!!"));
    res.status(200).json({ status: true, message: "Deleted successfully!!" });
  });

  export const updateCategory= asyncHandler(async (req, res, next) => {
    const categoryImg = req?.file

    let result;
    if(categoryImg)
      result = await cloudinary.uploader.upload(categoryImg?.path)
    
      const {id} =req?.params;
    const existingData = await category.findById(id)
    const isValidId = await category.findByIdAndUpdate(id,{
        ...req?.body,
        categoryImg: result?.secure_url || existingData?.categoryImg
    })

    if(!isValidId)
    return next(new errorResponse("No data found with given id!!"));
    res.status(200).json({ status: true, message: "Updated successfully!!" });
  });