import mongoose from "mongoose";
const callbackRequestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required!!"],
    },
    email: {
      type: String,
      required: [true, "email is required!!"],
    },
    message: {
      type: String,
      required: ["Message field is required!!"],
    },
    subject: {
      type: mongoose.Types.ObjectId,
      ref: "enquirySubject",
      required: [true, "Enquiry subject is required!!"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("callbackRequest", callbackRequestSchema);
