import mongoose from "mongoose";
import auth from "../models/auth.js";
import { CouponModel } from "../models/coupon.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Create a new coupon
export const createCoupon = asyncHandler(async (req, res) => {
  
        const { title, productSpecificList, totalNumberOfAvailableCoupon, minAmountToAvailCoupon, discountValue } = req.body;

        // Check if a coupon with the same title already exists
        const existingCoupon = await CouponModel.findOne({ title });
        if (existingCoupon) {
            return res.status(400).json({ message: "Coupon with this title already exists" });
        }


        // Create a new coupon
        const newCoupon = new CouponModel({
            title,
            productSpecificList:productSpecificList||[],
            totalNumberOfAvailableCoupon,
            minAmountToAvailCoupon,
            discountValue,
        });

        // Save the coupon to the database
        await newCoupon.save();

        res.status(201).json({status:true, message: "Coupon created successfully", data: newCoupon });
    
});

// Get all coupons
export const getAllCoupons = asyncHandler(async (req, res) => {
        
       const {productList,userId} = req.query;
         
       const userData = await auth.findOne({_id:userId}).lean();

       if(!userData)
       {
        return res.status(400).json({status:false,message:"User Does Not Exists !!"})
       }

       let query = [{$match:{
        userAvailed: {
          $not:{
            $in: [new mongoose.Types.ObjectId(userId)]
          }
        },
      }}];
 
       if(productList)
       {

         query.push( {$match:{
            productSpecificList: {
              $in: productList
            },
            expired:false
          }})

       }

       if(userData?.welcomeCouponAvailed)
       {
        query.push({
            $match: {
              title:{
                $not:{
                $regex:'WELCOME',
                  $options:'i'
              }
              }
            }
          })
       }
       
       console.log("Query",query)
       let coupons ;
       if(query.length === 0 ){
        coupons = await CouponModel.find().lean();
        }
        else{
            coupons = await CouponModel.aggregate(query);

        }
    
        
        res.status(200).json({status:true,message:"Data Fetched Successfully !!",data:coupons});
   
});

// Get a single coupon by ID
export const getCouponById = asyncHandler(async (req, res) => {

        const { id } = req.params;

        


        const coupon = await CouponModel.findById(id);
        if (!coupon) {
            return res.status(404).json({status:false,message: "Coupon not found" });
        }

        res.status(200).json({status:true,message:"Data Fetched Successfully !!",data:coupon});

});

// Update a coupon by ID
export const updateCoupon = asyncHandler(async (req, res) => {
   
        const { id } = req.params;
        const { title, productSpecificList, userAvailed, totalNumberOfAvailableCoupon, minAmountToAvailCoupon, discountValue, expired } = req.body;



        // Check if the coupon exists
        const existingCoupon = await CouponModel.findById(id);
        if (!existingCoupon) {
            return res.status(404).json({status:false, message: "Coupon not found" });
        }

        // Update the coupon
        const updatedCoupon = await CouponModel.findByIdAndUpdate(
            id,
            {
                title,
                productSpecificList,
                userAvailed,
                totalNumberOfAvailableCoupon,
                minAmountToAvailCoupon,
                discountValue,
                expired
            },
            { new: true } // Return the updated document
        );

        res.status(200).json({status:true, message: "Coupon updated successfully", coupon: updatedCoupon });
    
});

// Delete a coupon by ID
export const deleteCoupon = asyncHandler(async (req, res) => {
  
        const { id } = req.params;



        // Check if the coupon exists
        const existingCoupon = await CouponModel.findById(id);
        if (!existingCoupon) {
            return res.status(404).json({status:false, message: "Coupon not found" });
        }

        // Delete the coupon
        await CouponModel.findByIdAndDelete(id);

        res.status(200).json({status:true, message: "Coupon deleted successfully" });
    
});


export const checkCouponAvailability = asyncHandler(async (req,res)=>{

  const {promoCode,cartPrice} = req.query;

 const coupons = await CouponModel.findOne({title:promoCode}).lean();

 if(!coupons)
{
  return res.status(400).json({status:false,message:"Coupon Does Not Exists !!"})
}

res.status(200).json({status:true,message:"Coupon Fetched Successfully !!",data:coupons})


})


export const applyCoupon = asyncHandler(async (req,res)=>{
    const {promoCode,userId} = req.body;
   
    console.log(req.body)
    const coupons = await CouponModel.findOne({title:promoCode});

    if(!coupons)
    {
      return res.status(400).json({status:false,message:"Coupon Does Not Exists !!"});
    }

    if(coupons.totalNumberOfAvailableCoupon == 0)
      return res.status(400).json({status:false,message:"Cannot Avail Coupon !!"});


    coupons.userAvailed.push(userId);

    if(coupons.totalNumberOfAvailableCoupon == 1)
       coupons.expired = true;
    coupons.totalNumberOfAvailableCoupon -= 1;


    await coupons.save({runValidators:false});

    res.status(200).json({status:true,message:"Coupon Availed SuccessFully !!"});



})