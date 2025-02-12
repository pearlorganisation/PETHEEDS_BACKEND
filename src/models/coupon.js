import mongoose from "mongoose";


const couponSchema = new mongoose.Schema({
 
    title:{
        type:String,
        uppercase:true,
        unique:true,
        maxlength:[50,"Coupon Can have at max 50 Character"],
        minlength:[2,"Coupon Should Have at Least 2 Character"]
    },
    description:{
        type:String,
    },
    productSpecificList:{
        type:[mongoose.Schema.ObjectId]
    },
    userAvailed:{
        type:[mongoose.Schema.ObjectId]
    },
    totalNumberOfAvailableCoupon:{
        type:Number,
        min:[1,"Total Number Of Available Coupon Must be above 1"],
        default:1
    },
    minAmountToAvailCoupon:{
        type:Number,
        validate:{
            validator:function (){
                if (this.productSpecificList.length > 0)
                {
                  return false
                }
                else 
                  return true
              },
            message:"Please Enter Anyone of These -> Products/Min Amount To Avail This Coupon !! "
        }
    },
    discountValue:{
        type:Number,
        max:[100,"Max Value For Discount Value is 100"],
        min:[1,"Min Value For Discount Value is 1"],
        required:true
    },
    expired:{
        type:Boolean,
        default:false
    }

},{
    timestamps:true
});

export const CouponModel = new mongoose.model('CouponData',couponSchema);