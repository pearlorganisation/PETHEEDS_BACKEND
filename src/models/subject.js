import mongoose from "mongoose";
export const subjectSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: [true, "Subject is required!!"],
    },
    data: {
      type: String,
      // required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("subject", subjectSchema, "subject");
