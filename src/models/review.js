import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    product:{
        type:mongoose.Types.ObjectId
    },
    rating: {
        type:Number,
        enum:[1,2,3,4,5],
        required:[true,"rating is required"]
    },
    photo: String,
    message:{
        type:String
    }
})

export default mongoose.model("review",reviewSchema)