import { asyncHandler } from "../utils/asyncHandler.js";
import errorResponse from "../utils/errorResponse.js";
import category from "../models/category.js";

export const newCategory = asyncHandler(async(req,res,next)=>{
console.log(req.body)
console.log(JSON.parse(req?.body?.subTitle))
const {subTitle,...rest} = req?.body
    const categoryData =  new category({
        categoryImg:req?.file?.path,
        subTitle: JSON.parse(subTitle),
        ...rest
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