import mongoose from "mongoose";
const enquirySubjectSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: [true, "Enquiry subject is required!!"],
      unique: [true, "subject already exists!!"],
    },
  },
  { timestamps: true }
);
export default mongoose.model("enquirySubject", enquirySubjectSchema);
