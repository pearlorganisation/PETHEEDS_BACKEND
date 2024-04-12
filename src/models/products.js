import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, "product name is required!!"],
    },
    productImg: {
      type: {},
      required: [true, "Product image is required!!"],
    },
    price: [
      {
        weight: {
          type: String,
        },
        price: {
          type: Number,
          
        },
        totalPrice:{
          type:Number
        }
      }
    ],
    discount: {
      type: Number,
      
    },
    newInStore:{
      type:Boolean,
    },
    brand:{
      type:String,
      required:[true,"Brand name is required!!"]
    },
    // totalPrice: {
    //   type: Number,
      
    // },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "category",
      required:true,
    },

    gallery: {
      type: [],
    },
    about: {
      type: [String],
      required: [true, "About section is required!!"],
    },

    description: {
      type: String,
      required: [true, "Description is required!!"],
    },
  },
  { timestamps: true }
);

productSchema.methods.calculateTotalPrice = function() {
  console.log(this,"this")
  return this.price.map((item)=>{
    return {...item,totalPrice:Math.round(item.price * (1 - this.discount / 100))}
  });
};
export default mongoose.model("product", productSchema);
