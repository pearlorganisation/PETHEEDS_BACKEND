import mongoose from "mongoose";

export const authSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required!!"],
    },
    email: {
      type: String,
      validate:{
        validator: function (value) {
          return this.phoneNumber || value; // Ensure at least one of email or phoneNumber is present
        },
        message:"Please Provide At Least One Of The Following (Email/Phone Number)"
      }
      // required: [true, "Email is required!!"],

    },
    role: {
      type: String,
      enum: ["Admin", "User"],
      default: "User",
    },
    password: {
      type: String,
      required: [true, "password is required!!"],
    },
    phoneNumber: {
      type: Number,
      validate:{
        validator: function (value) {
          return this.email || value; // Ensure at least one of email or phoneNumber is present
        },
        message:"Please Provide At Least One Of The Following (Email/Phone Number)"
      }
      //   required: [true, "Number already exists!!"],
    },
    welcomeCouponAvailed:{
      type:Boolean,
      default:false
    },
    Address: {
      type: Number,
      //   required: [true, "Number already exists!!"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("auth", authSchema, "auth");
