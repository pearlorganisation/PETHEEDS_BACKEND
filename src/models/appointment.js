import mongoose from "mongoose";
const appointmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Fullfilled"],
    },
    phoneNumber:{
      type: Number,
      required: true,
      
    },
    email: {
      type: String,
      required: true,
    },
    subject: {
      type: mongoose.Types.ObjectId,
      ref: "subject",
      required: true,
    },
    date: {
      required: true,
      type: Date,
    },

    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("appointment", appointmentSchema);
