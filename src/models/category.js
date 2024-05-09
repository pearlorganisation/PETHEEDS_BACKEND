import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    title:{
        type:String,
         required:[true, "title is required for category"]
        },
        // subTitle:{
        //     type:[],
        // },
        
    categoryImg:{
        type:{},
        required:[true,"Image is required"]
    }
},
{timestamps:true})

export default mongoose.model("category",categorySchema)