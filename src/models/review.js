import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    product:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    rating: {
        type:Number,
        enum:[1,2,3,4,5],
        required:[true,"rating is required"]
    },
    reviewImages: [],
    message:{
        type:String
    },
    isApproved: {
        type:Boolean,
        default:false
    },
    isAdmin: {
        type:Boolean,
        default:false
    },
},{timestamps:true})

export default mongoose.model("review",reviewSchema)