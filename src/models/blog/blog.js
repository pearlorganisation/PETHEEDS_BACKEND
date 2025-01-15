import mongoose, { Mongoose } from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    banner: {
      type: String,
      required: [true, "Banner image is required!!"],
    },
    topic: { type: String, required: ["Topic is required!!"] },
    description: {
      type: String,
      required: [true, "Blog description is required!!"],
    },
    blogSlug: { type: String, required: ["Blog Slug is required!!"] },
  },

  { timestamps: true }
);

export default mongoose.model("blog", blogSchema);
